// module.exports = {
//     "extends": "eslint:recommended",
//     "env": {
//         "amd": true
//     },
//     "parserOptions": {
//         "sourceType": "module"
//     },
//     "rules": {
        
//     },
//     "env": { "es6": true },
//     // "parserOptions": { "ecmaVersion": 6 }
// };

module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
        }
    },
    "rules": {
        "semi": 2
    }
}