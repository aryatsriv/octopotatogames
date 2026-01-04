"use client";

import { Game } from "@/types";
import { useState } from "react";

interface IframeGameEngineProps {
    game: Game;
}

export default function IframeGameEngine({ game }: IframeGameEngineProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    if (!game.config.url) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-red-500">No URL specified for iframe game</p>
            </div>
        );
    }

    const aspectRatio = game.config.aspectRatio || "16/9";

    return (
        <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio }}>
            {loading && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-10">
                    <div className="text-white">Loading game...</div>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-10">
                    <div className="text-red-500">Failed to load game</div>
                </div>
            )}
            <iframe
                src={game.config.url}
                className="w-full h-full border-0"
                onLoad={() => setLoading(false)}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
            />
        </div>
    );
}
