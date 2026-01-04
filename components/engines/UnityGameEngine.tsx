"use client";

import { Game } from "@/types";
import { useEffect, useRef, useState } from "react";

interface UnityGameEngineProps {
    game: Game;
}

declare global {
    interface Window {
        createUnityInstance: any;
    }
}

export default function UnityGameEngine({ game }: UnityGameEngineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { loaderUrl, dataUrl, frameworkUrl, codeUrl } = game.config;

        if (!loaderUrl || !dataUrl || !frameworkUrl || !codeUrl) {
            setError("Missing Unity build files configuration");
            setLoading(false);
            return;
        }

        // Load Unity loader script
        const script = document.createElement("script");
        script.src = loaderUrl;
        script.async = true;

        script.onload = () => {
            if (canvasRef.current && window.createUnityInstance) {
                const buildUrl = {
                    dataUrl,
                    frameworkUrl,
                    codeUrl,
                };

                window.createUnityInstance(canvasRef.current, buildUrl, (progress: number) => {
                    setProgress(Math.round(progress * 100));
                })
                    .then(() => {
                        setLoading(false);
                        console.log(`Unity game loaded: ${game.name}`);
                    })
                    .catch((message: string) => {
                        setError(message);
                        setLoading(false);
                    });
            }
        };

        script.onerror = () => {
            setError("Failed to load Unity loader");
            setLoading(false);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [game]);

    const aspectRatio = game.config.aspectRatio || "16/9";

    return (
        <div className="w-full rounded-lg overflow-hidden bg-black" style={{ aspectRatio }}>
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-10">
                    <div className="text-white text-center">
                        <div className="mb-4">Loading Unity Game...</div>
                        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="mt-2 text-sm">{progress}%</div>
                    </div>
                </div>
            )}
            {error && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-red-500 text-center">
                        <p className="font-semibold">Error loading Unity game</p>
                        <p className="text-sm mt-2">{error}</p>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
