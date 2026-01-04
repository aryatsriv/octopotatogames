import { gameCategories } from "@/lib/games-data";
import Link from "next/link";
import { Gamepad2, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return gameCategories.map((category) => ({
        category: category.slug,
    }));
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category: categorySlug } = await params;
    const category = gameCategories.find((cat) => cat.slug === categorySlug);

    if (!category) {
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
                <span className="text-gray-900 dark:text-white">{category.name}</span>
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:underline"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
            </Link>

            {/* Category Header */}
            <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
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
                        className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
                    >
                        <div className="aspect-video bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <Gamepad2 className="h-16 w-16 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                                {game.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {game.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
