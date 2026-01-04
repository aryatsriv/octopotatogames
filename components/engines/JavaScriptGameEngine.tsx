"use client";

import { Game } from "@/types";
import { useEffect, useRef } from "react";

interface JavaScriptGameEngineProps {
    game: Game;
}

export default function JavaScriptGameEngine({ game }: JavaScriptGameEngineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!game.config.entryPoint) {
            console.error("No entry point specified for JavaScript game");
            return;
        }

        // Dynamically load the game script
        const script = document.createElement("script");
        script.src = game.config.entryPoint;
        script.async = true;

        script.onload = () => {
            // Game script should initialize itself
            // It can access the canvas via: document.getElementById(`game-canvas-${game.id}`)
            console.log(`Loaded JavaScript game: ${game.name}`);
        };

        script.onerror = () => {
            console.error(`Failed to load game script: ${game.config.entryPoint}`);
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script on unmount
            document.body.removeChild(script);
        };
    }, [game]);

    const aspectRatio = game.config.aspectRatio || "16/9";

    return (
        <div
            ref={containerRef}
            className="w-full rounded-lg overflow-hidden bg-black"
            style={{ aspectRatio }}
        >
            <canvas
                ref={canvasRef}
                id={`game-canvas-${game.id}`}
                className="w-full h-full"
            />
        </div>
    );
}
