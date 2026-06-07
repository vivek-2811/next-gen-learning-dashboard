"use client";

import React from "react";

/**
 * Renders a premium background mesh gradient and SVG grain texture overlay.
 * Fits perfectly inside an absolute/overflow-hidden card.
 */
export function CardBackgroundMesh() {
  return (
    <>
      {/* Abstract Glowing Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/[0.03] to-purple-600/5 opacity-80 blur-2xl pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-500" />
      
      {/* Subtle Analog Grain Overlay using SVG Filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none" aria-hidden="true">
        <filter id="card-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#card-grain-noise)" />
      </svg>
    </>
  );
}
