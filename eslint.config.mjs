import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["About"],
        },
      ],
      "no-process-env": "disable",
    },
  },
  { languageOptions: { globals: [globals.browser, globals.node] } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
