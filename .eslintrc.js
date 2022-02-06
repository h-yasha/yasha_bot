module.exports = {
    env: {
        // browser: true,
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["standard", "prettier", "eslint:recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        indent: ["error", "space"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "linebreak-style": ["error", "unix"],
    },
};
