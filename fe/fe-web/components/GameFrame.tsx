"use client";

interface GameFrameProps {
    src: string;
    title?: string;
    aspectRatio?: string;
}

export default function GameFrame({ src, title = "Game", aspectRatio = "16/9" }: GameFrameProps) {
    return (
        <div
            className="relative w-full overflow-hidden rounded-lg bg-black"
            style={{
                aspectRatio: aspectRatio,
                minHeight: "400px"
            }}
        >
            <iframe
                src={src}
                title={title}
                className="absolute inset-0 w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
                allow="fullscreen; gamepad; accelerometer; gyroscope; payment"
                allowFullScreen
            />
        </div>
    );
}
