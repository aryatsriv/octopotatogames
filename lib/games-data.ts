import { GameCategory } from "@/types";

export const gameCategories: GameCategory[] = [
    {
        id: "1",
        name: "Action",
        slug: "action",
        games: [
            {
                id: "1-1",
                name: "Space Shooter",
                slug: "space-shooter",
                description: "Fast-paced space combat game",
            },
            {
                id: "1-2",
                name: "Ninja Runner",
                slug: "ninja-runner",
                description: "Run, jump, and slice through obstacles",
            },
            {
                id: "1-3",
                name: "Battle Arena",
                slug: "battle-arena",
                description: "Multiplayer combat arena",
            },
        ],
    },
    {
        id: "2",
        name: "Puzzle",
        slug: "puzzle",
        games: [
            {
                id: "2-1",
                name: "Block Master",
                slug: "block-master",
                description: "Classic block puzzle game",
            },
            {
                id: "2-2",
                name: "Word Quest",
                slug: "word-quest",
                description: "Find hidden words in a grid",
            },
            {
                id: "2-3",
                name: "Match Three",
                slug: "match-three",
                description: "Match colorful gems",
            },
        ],
    },
    {
        id: "3",
        name: "Adventure",
        slug: "adventure",
        games: [
            {
                id: "3-1",
                name: "Treasure Hunt",
                slug: "treasure-hunt",
                description: "Explore and find hidden treasures",
            },
            {
                id: "3-2",
                name: "Mystery Island",
                slug: "mystery-island",
                description: "Uncover the secrets of the island",
            },
        ],
    },
    {
        id: "4",
        name: "Strategy",
        slug: "strategy",
        games: [
            {
                id: "4-1",
                name: "Tower Defense",
                slug: "tower-defense",
                description: "Defend your base from enemies",
            },
            {
                id: "4-2",
                name: "Chess Master",
                slug: "chess-master",
                description: "Classic chess with AI opponent",
            },
            {
                id: "4-3",
                name: "Empire Builder",
                slug: "empire-builder",
                description: "Build and manage your empire",
            },
        ],
    },
];
