import { Outlet } from "react-router-dom"

import { mq, theme } from "@/styles"

const headerHeight = "100px"

export function PanelContainer() {
  return (
    <>
      <header
        css={mq({
          height: headerHeight,
          position: "fixed",
          borderBottom: theme.colors.gray[200],
          top: "0px",
          backgroundColor: ["red", "", "green"],
          width: "100%",
        })}
      >
        Header
      </header>
      <main
        css={{
          marginTop: headerHeight,
          maxWidth: theme.breakpoints.sm,
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 1rem",
          border: "1px solid red",
          width: "100%",
        }}
      >
        <Outlet />
      </main>
    </>
  )
}
