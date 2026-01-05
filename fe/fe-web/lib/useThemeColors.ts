"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { theme } from "@/lib/theme";

export function useThemeColors() {
    const { theme: currentTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? currentTheme === "dark" : true;

    return {
        isDark,
        mounted,
        colors: isDark ? theme.colors.dark : theme.colors.light,
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
    };
}
