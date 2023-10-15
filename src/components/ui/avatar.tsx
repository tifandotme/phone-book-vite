import { theme } from "@/styles"

export function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <div
      css={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "middle",
        overflow: "hidden",
        userSelect: "none",
        width: "45px",
        height: "45px",
        borderRadius: "100%",
        backgroundColor: theme.colors.blue[200],
      }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.colors.blue[500],
          fontSize: "15px",
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        {initial}
      </div>
    </div>
  )
}
