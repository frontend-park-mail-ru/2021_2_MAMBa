module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "commonjs": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "rules": {},
    "globals": {
        "auth": true,
        "collections": true,
        "footer": true,
        "header": true,
        "Ajax": true,
        "loader": true,
    }
};
