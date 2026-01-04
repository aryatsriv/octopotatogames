"use client";

import { useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import { useThemeColors } from "@/lib/useThemeColors";

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
            <main className="min-h-[calc(100vh-4rem)]" style={{ backgroundColor: colors.background.DEFAULT }}>
                <div className="p-6">{children}</div>
            </main>
        </>
    );
}
