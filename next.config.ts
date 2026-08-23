import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root. Without this, Turbopack walks up the tree, finds a
  // stray lockfile in the user's home directory, and warns on every build.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
