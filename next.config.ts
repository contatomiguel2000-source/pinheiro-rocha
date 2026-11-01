import type { NextConfig } from "next";
import { basePath } from "./src/lib/base-path";

const nextConfig: NextConfig = {
  basePath,
  // Fotos de projeto: qualidades altas para não serrilhar gradientes de céu e parede
  images: { qualities: [60, 70, 75, 80, 85, 88, 90] },
};

export default nextConfig;
