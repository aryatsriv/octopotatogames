"use client";

import { Game } from "@/types";
import { useEffect, useRef } from "react";

interface JavaScriptGameEngineProps {
    game: Game;
}

declare global {
    interface Window {
        initGame?: (canvas: HTMLCanvasElement) => unknown;
    }
}

export default function JavaScriptGameEngine({ game }: JavaScriptGameEngineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<unknown>(null);

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
            console.log(`Loaded JavaScript game: ${game.name}`);

            // Initialize the game if initGame function is available
            if (canvasRef.current && typeof window.initGame === 'function') {
                try {
                    gameInstanceRef.current = window.initGame(canvasRef.current);
                    console.log(`Initialized game: ${game.name}`);
                } catch (error) {
                    console.error(`Failed to initialize game: ${game.name}`, error);
                }
            }
        };

        script.onerror = () => {
            console.error(`Failed to load game script: ${game.config.entryPoint}`);
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script on unmount
            if (script.parentNode) {
                document.body.removeChild(script);
            }
            // Clear the initGame function from window
            if (typeof window.initGame !== 'undefined') {
                delete window.initGame;
            }
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
