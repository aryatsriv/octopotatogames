"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900">
            <div className="flex h-16 items-center px-4 md:px-6">
                {/* Mobile menu button */}
                <button
                    onClick={onMenuClick}
                    className="mr-4 inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-800 lg:hidden text-white"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo/Brand */}
                <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-pink-500">
                        <span className="text-xl font-bold text-white">OG</span>
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                            className="w-64 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
