import { theme } from "@/styles"

declare module "@emotion/react" {
  export interface Theme extends Readonly<typeof theme> {}
}
