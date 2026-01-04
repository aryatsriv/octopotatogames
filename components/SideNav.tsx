"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Gamepad2 } from "lucide-react";
import { gameCategories } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import { theme } from "@/lib/theme";
import { useThemeColors } from "@/lib/useThemeColors";

interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideNav({ isOpen, onClose }: SideNavProps) {
    const pathname = usePathname();
    const { colors } = useThemeColors();
    const [expandedCategories, setExpandedCategories] = useState<string[]>([
        gameCategories[0]?.id || "",
    ]);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <>
            {/* Overlay - only on mobile when open */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar - overlay on mobile, collapsible on md+ */}
            <aside
                className={cn(
                    "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r transition-transform duration-200 ease-in-out overflow-y-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{
                    borderColor: colors.border.DEFAULT,
                    backgroundColor: colors.background.secondary
                }}
            >
                <nav className="p-4 space-y-2">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium"
                        style={pathname === "/" ? {
                            backgroundColor: `${theme.colors.primary.DEFAULT}30`,
                            color: theme.colors.primary.light
                        } : {
                            color: colors.text.primary
                        }}
                        onMouseEnter={(e) => {
                            if (pathname !== "/") e.currentTarget.style.backgroundColor = colors.background.tertiary;
                        }}
                        onMouseLeave={(e) => {
                            if (pathname !== "/") e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <Gamepad2 className="h-5 w-5" />
                        <span>All Games</span>
                    </Link>

                    {/* Categories */}
                    {gameCategories.map((category) => {
                        const isExpanded = expandedCategories.includes(category.id);
                        const isCategoryActive = pathname.startsWith(`/games/${category.slug}`);

                        return (
                            <div key={category.id}>
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors font-medium"
                                    style={isCategoryActive ? {
                                        backgroundColor: `${theme.colors.primary.DEFAULT}20`,
                                        color: theme.colors.primary.light
                                    } : {
                                        color: colors.text.primary
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isCategoryActive) e.currentTarget.style.backgroundColor = colors.background.tertiary;
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isCategoryActive) e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <span>{category.name}</span>
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>

                                {/* Games List */}
                                {isExpanded && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {category.games.map((game) => {
                                            const gamePath = `/games/${category.slug}/${game.slug}`;
                                            const isActive = pathname === gamePath;

                                            return (
                                                <Link
                                                    key={game.id}
                                                    href={gamePath}
                                                    className="block px-4 py-2 rounded-lg text-sm transition-colors"
                                                    style={isActive ? {
                                                        backgroundColor: `${theme.colors.primary.DEFAULT}30`,
                                                        color: theme.colors.primary.light,
                                                        fontWeight: 500
                                                    } : {
                                                        color: colors.text.tertiary
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.backgroundColor = colors.background.tertiary;
                                                            e.currentTarget.style.color = colors.text.secondary;
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                            e.currentTarget.style.color = colors.text.tertiary;
                                                        }
                                                    }}
                                                >
                                                    {game.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
