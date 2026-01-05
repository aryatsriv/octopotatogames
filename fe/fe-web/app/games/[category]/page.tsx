"use client";

import { gameCategories } from "@/lib/games-data";
import Link from "next/link";
import { Gamepad2, ArrowLeft } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { theme } from "@/lib/theme";
import { useThemeColors } from "@/lib/useThemeColors";

export default function CategoryPage() {
    const params = useParams();
    const { colors } = useThemeColors();
    const categorySlug = params.category as string;
    const category = gameCategories.find((cat) => cat.slug === categorySlug);

    if (!category) {
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
                <span style={{ color: colors.text.primary }}>{category.name}</span>
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center space-x-2 hover:underline"
                style={{ color: theme.colors.primary.light }}
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
            </Link>

            {/* Category Header */}
            <div className="rounded-2xl p-8 text-white" style={{
                background: `linear-gradient(to right, ${theme.colors.primary.dark}, ${theme.colors.secondary.dark})`
            }}>
                <h1 className="text-4xl font-bold mb-2">{category.name} Games</h1>
                <p className="text-xl opacity-90">
                    {category.games.length} games available in this category
                </p>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.games.map((game) => (
                    <Link
                        key={game.id}
                        href={`/games/${category.slug}/${game.slug}`}
                        className="group rounded-lg border overflow-hidden hover:shadow-xl transition-all hover:scale-105"
                        style={{
                            backgroundColor: colors.background.secondary,
                            borderColor: colors.border.DEFAULT
                        }}
                    >
                        <div className="aspect-video flex items-center justify-center" style={{
                            background: `linear-gradient(to bottom right, ${theme.colors.primary.light}, ${theme.colors.secondary.light})`
                        }}>
                            <Gamepad2 className="h-16 w-16 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2" style={{ color: colors.text.primary }}>
                                {game.name}
                            </h3>
                            <p className="text-sm line-clamp-2" style={{ color: colors.text.tertiary }}>
                                {game.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
