export interface Game {
    id: string;
    name: string;
    slug: string;
    thumbnail?: string;
    description?: string;
}

export interface GameCategory {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    games: Game[];
}
