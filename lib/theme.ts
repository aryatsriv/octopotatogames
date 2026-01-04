export const theme = {
    colors: {
        // Primary colors
        primary: {
            DEFAULT: '#10b981', // emerald-500
            light: '#34d399',   // emerald-400
            dark: '#059669',    // emerald-600
        },
        // Secondary colors
        secondary: {
            DEFAULT: '#14b8a6', // teal-500
            light: '#2dd4bf',   // teal-400
            dark: '#0d9488',    // teal-600
        },
        // Accent colors
        accent: {
            DEFAULT: '#22c55e', // green-500
            light: '#4ade80',   // green-400
            dark: '#16a34a',    // green-600
        },
        // Dark mode colors
        dark: {
            background: {
                primary: '#030712',   // gray-950
                secondary: '#111827', // gray-900
                tertiary: '#1f2937',  // gray-800
            },
            text: {
                primary: '#ffffff',   // white
                secondary: '#d1d5db', // gray-300
                tertiary: '#9ca3af',  // gray-400
                muted: '#6b7280',     // gray-500
            },
            border: {
                DEFAULT: '#374151',   // gray-700
                light: '#4b5563',     // gray-600
                dark: '#1f2937',      // gray-800
            },
        },
        // Light mode colors
        light: {
            background: {
                primary: '#ffffff',   // white
                secondary: '#f9fafb', // gray-50
                tertiary: '#f3f4f6',  // gray-100
            },
            text: {
                primary: '#1f2937',   // gray-800
                secondary: '#4b5563', // gray-600
                tertiary: '#6b7280',  // gray-500
                muted: '#9ca3af',     // gray-400
            },
            border: {
                DEFAULT: '#e5e7eb',   // gray-200
                light: '#d1d5db',     // gray-300
                dark: '#9ca3af',      // gray-400
            },
        },
    },

    // Gradient combinations
    gradients: {
        primary: 'from-emerald-500 to-teal-500',
        secondary: 'from-emerald-600 to-teal-600',
        accent: 'from-emerald-400 to-teal-400',
    },
} as const;

export type Theme = typeof theme;
