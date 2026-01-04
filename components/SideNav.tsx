"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Gamepad2 } from "lucide-react";
import { gameCategories } from "@/lib/games-data";
import { cn } from "@/lib/utils";

interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideNav({ isOpen, onClose }: SideNavProps) {
    const pathname = usePathname();
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
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r border-gray-800 bg-gray-900 transition-transform duration-200 ease-in-out overflow-y-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <nav className="p-4 space-y-2">
                    {/* Home Link */}
                    <Link
                        href="/"
                        onClick={onClose}
                        className={cn(
                            "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-white",
                            pathname === "/"
                                ? "bg-purple-900/30 text-purple-400"
                                : "hover:bg-gray-800"
                        )}
                    >
                        <Gamepad2 className="h-5 w-5" />
                        <span className="font-medium">All Games</span>
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
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-white",
                                        isCategoryActive
                                            ? "bg-purple-900/20 text-purple-400"
                                            : "hover:bg-gray-800"
                                    )}
                                >
                                    <span className="font-medium">{category.name}</span>
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
                                                    onClick={onClose}
                                                    className={cn(
                                                        "block px-4 py-2 rounded-lg text-sm transition-colors",
                                                        isActive
                                                            ? "bg-purple-900/30 text-purple-400 font-medium"
                                                            : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                                                    )}
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
