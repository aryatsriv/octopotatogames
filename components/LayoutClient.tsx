"use client";

import { useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";

export default function LayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    return (
        <>
            <Header onMenuClick={() => setIsSideNavOpen(!isSideNavOpen)} />
            <SideNav
                isOpen={isSideNavOpen}
                onClose={() => setIsSideNavOpen(false)}
            />
            <main className="min-h-[calc(100vh-4rem)] bg-gray-950">
                <div className="p-6">{children}</div>
            </main>
        </>
    );
}
