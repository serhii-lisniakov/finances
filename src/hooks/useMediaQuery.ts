import {useEffect, useState} from "react";

type PredefinedMediaQuery = "sm" | "md" | "lg";

const screens: {[key in PredefinedMediaQuery]: string} = {
    sm: "768px",
    md: "1024px",
    lg: "1440px",
};

export function useMediaQuery(query: PredefinedMediaQuery | string): boolean {
    let queryExpr: string;

    const isPredefined = Object.keys(screens).includes(query);

    queryExpr = isPredefined ? `(max-width: ${screens[query as PredefinedMediaQuery]})` : query;

    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(queryExpr));

    function handleChange() {
        setMatches(getMatches(queryExpr));
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(queryExpr);

        // Triggered at the first client-side load and if query changes
        handleChange();

        // Listen matchMedia
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener("change", handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener("change", handleChange);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryExpr]);

    return matches;
}
