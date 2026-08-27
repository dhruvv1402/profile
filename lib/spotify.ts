import "server-only";

/**
 * What the author is playing, from the Spotify Web API.
 *
 * Needs three environment variables (in .env.local, and in the deployment's
 * settings): SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN.
 * Until they exist the gramophone section quietly hides itself, same policy
 * as the GitHub dispatches: a portfolio must never look broken because a
 * third-party is unavailable.
 *
 * Getting the refresh token, once:
 *   1. Create an app at developer.spotify.com/dashboard; add
 *      http://127.0.0.1:8888/callback as a redirect URI.
 *   2. Visit accounts.spotify.com/authorize?client_id=...&response_type=code
 *      &redirect_uri=http://127.0.0.1:8888/callback
 *      &scope=user-read-currently-playing+user-read-recently-played
 *      and approve; copy the ?code= from the redirected URL.
 *   3. POST accounts.spotify.com/api/token with grant_type=authorization_code,
 *      the code, the redirect_uri, and Basic client_id:client_secret — the
 *      response carries the refresh_token. It does not expire.
 */

export type Track = {
  title: string;
  artist: string;
  album: string;
  /** ~300px album art URL, or null when Spotify offers none. */
  art: string | null;
  url: string;
  /** ISO timestamp; present on recently-played entries only. */
  playedAt?: string;
};

export type Listening = {
  nowPlaying: Track | null;
  recent: Track[];
};

export function spotifyConfigured(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

/* The access token lives about an hour; cache it in module scope so the
   listening endpoint does not round-trip the token exchange on every poll. */
let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
      }),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      access_token?: string;
      expires_in?: number;
    };
    if (!data.access_token) return null;
    cachedToken = {
      value: data.access_token,
      // A minute of headroom so a token never expires mid-request.
      expiresAt: Date.now() + ((data.expires_in ?? 3600) - 60) * 1000,
    };
    return cachedToken.value;
  } catch {
    return null;
  }
}

type SpotifyTrack = {
  name?: string;
  artists?: { name?: string }[];
  album?: { name?: string; images?: { url?: string; width?: number }[] };
  external_urls?: { spotify?: string };
};

function toTrack(item: SpotifyTrack | null | undefined): Track | null {
  if (!item?.name) return null;
  const images = item.album?.images ?? [];
  return {
    title: item.name,
    artist: (item.artists ?? [])
      .map((a) => a.name)
      .filter(Boolean)
      .join(", "),
    album: item.album?.name ?? "",
    // images arrive largest-first; the middle cut (~300px) suits the sleeve.
    art: images[1]?.url ?? images[0]?.url ?? null,
    url: item.external_urls?.spotify ?? "",
  };
}

export async function getListening(): Promise<Listening | null> {
  if (!spotifyConfigured()) return null;
  const token = await accessToken();
  if (!token) return null;
  const headers = { Authorization: `Bearer ${token}` };

  let nowPlaying: Track | null = null;
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers, cache: "no-store" },
    );
    // 204 is Spotify for "the needle is up" — nothing playing.
    if (response.status === 200) {
      const data = (await response.json()) as {
        is_playing?: boolean;
        currently_playing_type?: string;
        item?: SpotifyTrack;
      };
      if (data.is_playing && data.currently_playing_type === "track") {
        nowPlaying = toTrack(data.item);
      }
    }
  } catch {
    /* fail soft */
  }

  let recent: Track[] = [];
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=4",
      { headers, cache: "no-store" },
    );
    if (response.ok) {
      const data = (await response.json()) as {
        items?: { track?: SpotifyTrack; played_at?: string }[];
      };
      recent = (data.items ?? []).flatMap((entry) => {
        const track = toTrack(entry.track);
        if (!track) return [];
        if (entry.played_at) track.playedAt = entry.played_at;
        return [track];
      });
    }
  } catch {
    /* fail soft */
  }

  return { nowPlaying, recent };
}
