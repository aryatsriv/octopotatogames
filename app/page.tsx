"use client";

import Link from "next/link";
import { gameCategories } from "@/lib/games-data";
import { Gamepad2 } from "lucide-react";
import { theme } from "@/lib/theme";
import { useThemeColors } from "@/lib/useThemeColors";

export default function Home() {
  const { colors } = useThemeColors();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-2xl p-8 text-white" style={{
        background: `linear-gradient(to right, ${theme.colors.primary.dark}, ${theme.colors.secondary.dark})`
      }}>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to OctoPotatoGames
        </h1>
        <p className="text-xl opacity-90">
          Discover and play amazing free online games across various categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border p-6 hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.DEFAULT
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{
                  backgroundColor: `${theme.colors.primary.DEFAULT}30`
                }}>
                  <Gamepad2 className="h-6 w-6" style={{ color: theme.colors.primary.light }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: colors.text.primary }}>
                  {category.name}
                </h3>
              </div>

              <p className="text-sm mb-4" style={{ color: colors.text.tertiary }}>
                {category.games.length} games available
              </p>

              <div className="space-y-2">
                {category.games.slice(0, 3).map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${category.slug}/${game.slug}`}
                    className="block text-sm hover:underline"
                    style={{ color: theme.colors.primary.light }}
                  >
                    → {game.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Games */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text.primary }}>
          Popular Games
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gameCategories
            .flatMap((cat) => cat.games.map((game) => ({ ...game, category: cat })))
            .slice(0, 8)
            .map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.category.slug}/${game.slug}`}
                className="rounded-lg border p-4 hover:shadow-lg transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.border.DEFAULT
                }}
              >
                <div className="aspect-video rounded-lg mb-3 flex items-center justify-center" style={{
                  background: `linear-gradient(to bottom right, ${theme.colors.primary.light}, ${theme.colors.secondary.light})`
                }}>
                  <Gamepad2 className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-semibold mb-1" style={{ color: colors.text.primary }}>
                  {game.name}
                </h3>
                <p className="text-xs" style={{ color: colors.text.tertiary }}>
                  {game.description}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
