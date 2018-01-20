module.exports = {
    "env": {
        "browser": true
    },
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "comma-dangle": ["error", "never"],
        "jsx-a11y/anchor-is-valid": "off",
        "react/prop-types": ["enabled", { ignore: "props" }],
        "react/no-unused-state": "off",
        "no-param-reassign": "off",
        "class-methods-use-this": "off",
        "no-class-assign": "off",
        "import/prefer-default-export": "off"
    }
};