/** @type {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} */
const importConfig = {
  importOrder: [
    "",
    "^(react/(.*)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/public(/.*)?$",
    "^@/types(/.*)?$",
    "^@/config(/.*)?$",
    "^@/lib(/.*)?$",
    "^@/hooks(/.*)?$",
    "^@/styles(/.*)?$",
    "^@/components/ui(.*)$",
    "^@/components(.*)$",
    "",
    "^[.]",
  ],
}

/** @type {import("prettier").Options} */
export default {
  ...importConfig,

  semi: false,

  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
