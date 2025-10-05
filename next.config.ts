// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // capas comuns
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "covers.openlibrary.org" }, // <- novo (Open Library)
      // adicione mais se precisar (um por linha):
      // { protocol: "https", hostname: "i.gr-assets.com" },          // Goodreads
      // { protocol: "https", hostname: "books.google.com" },         // Google Books
      // { protocol: "https", hostname: "images-na.ssl-images-amazon.com" }, // Amazon antiga
    ],
  },
};

export default nextConfig;
