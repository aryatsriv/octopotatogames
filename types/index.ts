export type GameEngine = 'javascript' | 'unity' | 'html5' | 'iframe';

export interface GameConfig {
    engine: GameEngine;
    // For JavaScript games
    entryPoint?: string; // Path to the main JS file
    // For Unity games
    loaderUrl?: string;
    dataUrl?: string;
    frameworkUrl?: string;
    codeUrl?: string;
    // For HTML5/iframe games
    url?: string;
    // Common settings
    width?: string;
    height?: string;
    aspectRatio?: string;
}

export interface Game {
    id: string;
    name: string;
    slug: string;
    thumbnail?: string;
    description?: string;
    config: GameConfig;
}

export interface GameCategory {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    games: Game[];
}
