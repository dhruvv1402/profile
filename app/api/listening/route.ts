import { getListening } from "@/lib/spotify";

/**
 * What the gramophone is playing, fetched live per request — the home page
 * itself is static, so the needle position has to come from here rather
 * than from the page render. See components/home/Turntable.tsx.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const listening = await getListening();
  return Response.json(listening ?? { nowPlaying: null, recent: [] }, {
    headers: { "Cache-Control": "no-store" },
  });
}
