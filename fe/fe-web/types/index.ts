export type GameEngine = 'html5' | 'unity' | 'webassembly';

export interface GameConfig {
    engine: GameEngine;
    // URL to the game's index.html (all games load via iframe)
    url: string;
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
