import type { NextConfig } from "next";
import { basePath } from "./src/lib/base-path";

const nextConfig: NextConfig = {
  basePath,
  // Fotos de projeto: qualidades altas para não serrilhar gradientes de céu e parede
  images: { qualities: [60, 75, 92] },
};

export default nextConfig;
