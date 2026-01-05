"use client";

import { useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import { useThemeColors } from "@/lib/useThemeColors";
import { cn } from "@/lib/utils";

export default function LayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const { colors } = useThemeColors();

    return (
        <>
            <Header onMenuClick={() => setIsSideNavOpen(!isSideNavOpen)} />
            <SideNav
                isOpen={isSideNavOpen}
                onClose={() => setIsSideNavOpen(false)}
            />
            <main
                className={cn(
                    "min-h-[calc(100vh-4rem)] transition-all duration-200",
                    isSideNavOpen && "md:pl-64"
                )}
                style={{ backgroundColor: colors.background.primary }}
            >
                <div className="p-6">{children}</div>
            </main>
        </>
    );
}
