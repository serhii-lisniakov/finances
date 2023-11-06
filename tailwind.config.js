module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: ["class", ".dx-color-scheme-dark"],
    theme: {
        extend: {
            colors: {
                "cell-green": "#bbf7d0",
                "cell-yellow": "#fde68a",
            },
        },
    },
    plugins: [],
    screens: {
        sm: "768px",
        md: "1024px",
        lg: "1440px",
    },
};
