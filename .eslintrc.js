module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "comma-dangle": ["error", "never"],
        "jsx-a11y/anchor-is-valid": "off",
        "react/prop-types": ["enabled", { ignore: "props" }]
    }
};