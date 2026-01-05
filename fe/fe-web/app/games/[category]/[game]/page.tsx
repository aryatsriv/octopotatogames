"use client";

import { gameCategories } from "@/lib/games-data";
import Link from "next/link";
import { Gamepad2, ArrowLeft } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { theme } from "@/lib/theme";
import { useThemeColors } from "@/lib/useThemeColors";
import GameFrame from "@/components/GameFrame";

export default function GamePage() {
    const params = useParams();
    const { colors } = useThemeColors();
    const categorySlug = params.category as string;
    const gameSlug = params.game as string;

    const category = gameCategories.find((cat) => cat.slug === categorySlug);
    const game = category?.games.find((g) => g.slug === gameSlug);

    if (!category || !game) {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm" style={{ color: colors.text.tertiary }}>
                <Link href="/" className="hover:underline" style={{ color: theme.colors.primary.light }}>
                    Home
                </Link>
                <span>/</span>
                <Link
                    href={`/games/${category.slug}`}
                    className="hover:underline"
                    style={{ color: theme.colors.primary.light }}
                >
                    {category.name}
                </Link>
                <span>/</span>
                <span style={{ color: colors.text.primary }}>{game.name}</span>
            </div>

            {/* Back Button */}
            <Link
                href={`/games/${category.slug}`}
                className="inline-flex items-center space-x-2 hover:underline"
                style={{ color: theme.colors.primary.light }}
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to {category.name}</span>
            </Link>

            {/* Game Header */}
            <div className="rounded-lg border p-8" style={{
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.DEFAULT
            }}>
                <div className="flex items-start space-x-6">
                    <div className="shrink-0">
                        <div className="w-32 h-32 rounded-lg flex items-center justify-center" style={{
                            background: `linear-gradient(to bottom right, ${theme.colors.primary.light}, ${theme.colors.secondary.light})`
                        }}>
                            <Gamepad2 className="h-16 w-16 text-white" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.text.primary }}>
                            {game.name}
                        </h1>
                        <p className="mb-4" style={{ color: colors.text.tertiary }}>
                            {game.description}
                        </p>
                        <div className="flex items-center space-x-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{
                                backgroundColor: `${theme.colors.primary.DEFAULT}30`,
                                color: theme.colors.primary.light
                            }}>
                                {category.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Container */}
            <div className="rounded-lg border overflow-hidden" style={{
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.DEFAULT
            }}>
                <GameFrame
                    src={game.config.url || `/games/${game.slug}/index.html`}
                    title={game.name}
                    aspectRatio={game.config.aspectRatio || "16/9"}
                />
            </div>

            {/* Game Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border p-6" style={{
                    backgroundColor: colors.background.secondary,
                    borderColor: colors.border.DEFAULT
                }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text.primary }}>
                        About This Game
                    </h2>
                    <p style={{ color: colors.text.tertiary }}>
                        {game.description || "No description available."}
                    </p>
                </div>

                <div className="rounded-lg border p-6" style={{
                    backgroundColor: colors.background.secondary,
                    borderColor: colors.border.DEFAULT
                }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text.primary }}>
                        How to Play
                    </h2>
                    <ul className="space-y-2" style={{ color: colors.text.tertiary }}>
                        <li>• Use arrow keys to move</li>
                        <li>• Press Space to jump/shoot</li>
                        <li>• Collect points and avoid obstacles</li>
                        <li>• Have fun!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
