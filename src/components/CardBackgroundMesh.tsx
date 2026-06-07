export function CardBackgroundMesh() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" aria-hidden="true">
            {/* Gradient mesh blobs */}
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-12 -right-8 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-violet-500/05 blur-2xl" />

            {/* SVG grain texture overlay */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.03]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.75"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>
        </div>
    );
}