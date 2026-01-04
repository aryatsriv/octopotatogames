"use client";

import { Game } from "@/types";
import dynamic from "next/dynamic";

// Dynamically import engine-specific components
const JavaScriptGameEngine = dynamic(() => import("./engines/JavaScriptGameEngine"), {
    ssr: false,
    loading: () => <LoadingState message="Loading JavaScript game..." />
});

const UnityGameEngine = dynamic(() => import("./engines/UnityGameEngine"), {
    ssr: false,
    loading: () => <LoadingState message="Loading Unity game..." />
});

const HTML5GameEngine = dynamic(() => import("./engines/HTML5GameEngine"), {
    ssr: false,
    loading: () => <LoadingState message="Loading game..." />
});

const IframeGameEngine = dynamic(() => import("./engines/IframeGameEngine"), {
    ssr: false,
    loading: () => <LoadingState message="Loading game..." />
});

interface GameRendererProps {
    game: Game;
}

function LoadingState({ message }: { message: string }) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">{message}</p>
            </div>
        </div>
    );
}

export default function GameRenderer({ game }: GameRendererProps) {
    const { config } = game;

    switch (config.engine) {
        case 'javascript':
            return <JavaScriptGameEngine game={game} />;
        case 'unity':
            return <UnityGameEngine game={game} />;
        case 'html5':
            return <HTML5GameEngine game={game} />;
        case 'iframe':
            return <IframeGameEngine game={game} />;
        default:
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-red-500">Unknown game engine: {config.engine}</p>
                </div>
            );
    }
}
