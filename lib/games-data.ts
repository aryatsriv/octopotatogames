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
                config: {
                    engine: "javascript",
                    entryPoint: "/games/space-shooter/game.js",
                    aspectRatio: "16/9",
                },
            },
            {
                id: "1-2",
                name: "Ninja Runner",
                slug: "ninja-runner",
                description: "Run, jump, and slice through obstacles",
                config: {
                    engine: "unity",
                    loaderUrl: "/games/ninja-runner/Build/ninja-runner.loader.js",
                    dataUrl: "/games/ninja-runner/Build/ninja-runner.data",
                    frameworkUrl: "/games/ninja-runner/Build/ninja-runner.framework.js",
                    codeUrl: "/games/ninja-runner/Build/ninja-runner.wasm",
                    aspectRatio: "16/9",
                },
            },
            {
                id: "1-3",
                name: "Battle Arena",
                slug: "battle-arena",
                description: "Multiplayer combat arena",
                config: {
                    engine: "html5",
                    url: "/games/battle-arena/index.html",
                    aspectRatio: "16/9",
                },
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
                config: {
                    engine: "javascript",
                    entryPoint: "/games/block-master/game.js",
                    aspectRatio: "9/16", // Portrait mode for puzzle
                },
            },
            {
                id: "2-2",
                name: "Word Quest",
                slug: "word-quest",
                description: "Find hidden words in a grid",
                config: {
                    engine: "html5",
                    url: "/games/word-quest/index.html",
                    aspectRatio: "4/3",
                },
            },
            {
                id: "2-3",
                name: "Match Three",
                slug: "match-three",
                description: "Match colorful gems",
                config: {
                    engine: "javascript",
                    entryPoint: "/games/match-three/game.js",
                    aspectRatio: "9/16",
                },
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
                config: {
                    engine: "unity",
                    loaderUrl: "/games/treasure-hunt/Build/treasure-hunt.loader.js",
                    dataUrl: "/games/treasure-hunt/Build/treasure-hunt.data",
                    frameworkUrl: "/games/treasure-hunt/Build/treasure-hunt.framework.js",
                    codeUrl: "/games/treasure-hunt/Build/treasure-hunt.wasm",
                    aspectRatio: "16/9",
                },
            },
            {
                id: "3-2",
                name: "Mystery Island",
                slug: "mystery-island",
                description: "Uncover the secrets of the island",
                config: {
                    engine: "html5",
                    url: "/games/mystery-island/index.html",
                    aspectRatio: "16/9",
                },
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
                config: {
                    engine: "javascript",
                    entryPoint: "/games/tower-defense/game.js",
                    aspectRatio: "16/9",
                },
            },
            {
                id: "4-2",
                name: "Chess Master",
                slug: "chess-master",
                description: "Classic chess with AI opponent",
                config: {
                    engine: "html5",
                    url: "/games/chess-master/index.html",
                    aspectRatio: "1/1", // Square for chess board
                },
            },
            {
                id: "4-3",
                name: "Empire Builder",
                slug: "empire-builder",
                description: "Build and manage your empire",
                config: {
                    engine: "unity",
                    loaderUrl: "/games/empire-builder/Build/empire-builder.loader.js",
                    dataUrl: "/games/empire-builder/Build/empire-builder.data",
                    frameworkUrl: "/games/empire-builder/Build/empire-builder.framework.js",
                    codeUrl: "/games/empire-builder/Build/empire-builder.wasm",
                    aspectRatio: "16/9",
                },
            },
        ],
    },
    {
        id: "5",
        name: "Computer Skills",
        slug: "computerskills",
        games: [
            {
                id: "5-1",
                name: "Reaction Time Test",
                slug: "reaction-test",
                description: "Test your reaction speed - click when the screen turns green!",
                config: {
                    engine: "javascript",
                    entryPoint: "/games/reaction-test/game.js",
                    aspectRatio: "16/9",
                },
            },
            {
                id: "5-2",
                name: "Click Speed Test",
                slug: "click-test",
                description: "How many times can you click in 10 seconds?",
                config: {
                    engine: "javascript",
                    entryPoint: "/games/click-test/game.js",
                    aspectRatio: "16/9",
                },
            },
            {
                id: "5-3",
                name: "Typing Speed Test",
                slug: "typing-test",
                description: "Test your typing speed and accuracy in 60 seconds",
                config: {
                    engine: "javascript",
                    entryPoint: "/games/typing-test/game.js",
                    aspectRatio: "16/9",
                },
            },
        ],
    },
];
