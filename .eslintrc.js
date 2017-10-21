module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "indent": ["error", 4],
        "no-prototype-builtins": "off",
        "no-cond-assign": ["error", "except-parens"]
    },
    "overrides": {
        "files": [ "lib/*.js", "test/*.js" ],
        "excludedFiles": "example.js",
    },
};
