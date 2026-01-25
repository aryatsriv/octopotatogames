"use client";

import { theme } from "@/lib/theme";

export function useThemeColors() {
    return {
        isDark: false,
        mounted: true,
        colors: theme.colors.light,
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
    };
}