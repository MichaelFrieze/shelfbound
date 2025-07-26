import {
	createContext,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

import { FunctionOnce } from "@/lib/function-once";

export type ResolvedTheme = "dark" | "light";
export type Theme = ResolvedTheme | "system";

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
	disableTransitionOnChange?: boolean;
	enableColorScheme?: boolean;
}

interface ThemeProviderState {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
	theme: "system",
	resolvedTheme: "light",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const isBrowser = typeof window !== "undefined";

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "theme",
	disableTransitionOnChange = false,
	enableColorScheme = false,
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (!isBrowser) return defaultTheme;
		const stored = localStorage.getItem(storageKey);
		return stored ? (stored as Theme) : defaultTheme;
	});
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

	const withoutTransitions = useCallback(
		(fn: () => void) => {
			if (!disableTransitionOnChange) {
				fn();
				return;
			}

			const css = document.createElement("style");
			css.textContent =
				"*, *::before, *::after { transition: none !important; }";
			document.head.appendChild(css);

			fn();

			document.body.offsetHeight;

			document.head.removeChild(css);
		},
		[disableTransitionOnChange],
	);

	useEffect(() => {
		const root = window.document.documentElement;
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		function updateTheme() {
			withoutTransitions(() => {
				root.classList.remove("light", "dark");

				if (theme === "system") {
					const systemTheme = mediaQuery.matches ? "dark" : "light";
					setResolvedTheme(systemTheme);
					root.classList.add(systemTheme);

					if (enableColorScheme) {
						root.style.setProperty("color-scheme", systemTheme);
					}
					return;
				}

				setResolvedTheme(theme);
				root.classList.add(theme);

				if (enableColorScheme) {
					root.style.setProperty("color-scheme", theme);
				}
			});
		}

		mediaQuery.addEventListener("change", updateTheme);
		updateTheme();

		return () => mediaQuery.removeEventListener("change", updateTheme);
	}, [theme, enableColorScheme, withoutTransitions]);

	const value = useMemo(
		() => ({
			theme,
			resolvedTheme,
			setTheme: (newTheme: Theme) => {
				localStorage.setItem(storageKey, newTheme);
				setTheme(newTheme);
			},
		}),
		[theme, resolvedTheme, storageKey],
	);

	return (
		<ThemeProviderContext value={value}>
			<FunctionOnce param={{ storageKey, defaultTheme }}>
				{({ storageKey: key, defaultTheme: defaultThemeValue }) => {
					const storedTheme: string | null = localStorage.getItem(key);

					if (
						storedTheme === "dark" ||
						(storedTheme === null && defaultThemeValue === "dark") ||
						((storedTheme === "system" ||
							(storedTheme === null && defaultThemeValue === "system")) &&
							window.matchMedia("(prefers-color-scheme: dark)").matches)
					) {
						document.documentElement.classList.add("dark");
					}
				}}
			</FunctionOnce>
			{children}
		</ThemeProviderContext>
	);
}

export function useTheme() {
	const context = use(ThemeProviderContext);
	return context;
}

// This theme provider was inspired by: https://github.com/wannabespace/conar/blob/main/packages/ui/src/theme-provider.tsx
