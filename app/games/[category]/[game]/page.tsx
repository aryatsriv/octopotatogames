import { gameCategories } from "@/lib/games-data";
import Link from "next/link";
import { Gamepad2, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    const params: { category: string; game: string }[] = [];

    gameCategories.forEach((category) => {
        category.games.forEach((game) => {
            params.push({
                category: category.slug,
                game: game.slug,
            });
        });
    });

    return params;
}

export default async function GamePage({
    params,
}: {
    params: Promise<{ category: string; game: string }>;
}) {
    const { category: categorySlug, game: gameSlug } = await params;
    const category = gameCategories.find((cat) => cat.slug === categorySlug);
    const game = category?.games.find((g) => g.slug === gameSlug);

    if (!category || !game) {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">
                    Home
                </Link>
                <span>/</span>
                <Link
                    href={`/games/${category.slug}`}
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                >
                    {category.name}
                </Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">{game.name}</span>
            </div>

            {/* Back Button */}
            <Link
                href={`/games/${category.slug}`}
                className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:underline"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to {category.name}</span>
            </Link>

            {/* Game Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-start space-x-6">
                    <div className="shrink-0">
                        <div className="w-32 h-32 bg-linear-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                            <Gamepad2 className="h-16 w-16 text-white" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {game.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {game.description}
                        </p>
                        <div className="flex items-center space-x-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                {category.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="aspect-video bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <Gamepad2 className="h-24 w-24 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Game will be loaded here
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            This is a placeholder for the actual game content
                        </p>
                    </div>
                </div>
            </div>

            {/* Game Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        About This Game
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {game.description || "No description available."}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        How to Play
                    </h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
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
