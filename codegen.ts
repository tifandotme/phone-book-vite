import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "https://wpe-hiring.tokopedia.net/graphql",
  documents: ["src/lib/graphql.ts"],
  generates: {
    "./src/types/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
