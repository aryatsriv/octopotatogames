"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { theme } from "@/lib/theme";
import { useTheme } from "next-themes";
import { useThemeColors } from "@/lib/useThemeColors";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { setTheme } = useTheme();
    const { isDark, mounted, colors } = useThemeColors();

    return (
        <header className="sticky top-0 z-50 w-full border-b" style={{
            borderColor: colors.border.DEFAULT,
            backgroundColor: colors.background.secondary
        }}>
            <div className="flex h-16 items-center px-4 md:px-6">
                {/* Menu toggle button - now visible on all screens */}
                <button
                    onClick={onMenuClick}
                    className="mr-4 inline-flex items-center justify-center rounded-md p-2"
                    style={{
                        color: colors.text.primary,
                        backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.background.tertiary}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo/Brand */}
                <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{
                        background: `linear-gradient(to bottom right, ${theme.colors.primary.DEFAULT}, ${theme.colors.secondary.DEFAULT})`
                    }}>
                        <span className="text-xl font-bold text-white">OG</span>
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        OctoPotatoGames
                    </span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Search (placeholder for future) */}
                <div className="hidden md:flex items-center mr-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search games..."
                            className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                            style={{
                                borderColor: colors.border.DEFAULT,
                                backgroundColor: colors.background.tertiary,
                                color: colors.text.primary,
                                '--tw-ring-color': theme.colors.primary.DEFAULT
                            } as React.CSSProperties}
                        />
                    </div>
                </div>

                {/* Theme toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="inline-flex items-center justify-center rounded-md p-2"
                        style={{ color: colors.text.primary }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.background.tertiary}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                )}
            </div>
        </header>
    );
}
