module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "rules": {
      "no-console": 0,
      "semi": [1, "always"], // 句末需要分号
      "indent": [1, 4], // 缩进4个空格
      // "quotes": [1, "single"], // 请使用单引号
      "space-infix-ops": [1, {
          "int32Hint": true
      }], // 运算符周围空格
      "comma-spacing": [1, {
          "before": false, // 逗号前不能有空格
          "after": true // 逗号后一定要有空格
      }], // 逗号周围空格
      "key-spacing": [1, { 
          "afterColon": true
      }], // 健值对，冒号后要有空格
      "object-curly-spacing": [1, "always"], // 对象大括号内空格
      // "array-bracket-spacing": [1, "always"], // 数组中括号内空格
      "space-before-blocks": [1, "always"], // 块（左大括号）前必须有一个空格
      "no-unused-vars": [1, { // 未使用的变量或参数
          "vars": "all",
          "args": "after-used"
      }]
  }
};