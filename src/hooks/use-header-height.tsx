import React from "react"

export function useHeaderHeight() {
  const [height, setHeight] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    setHeight(ref.current?.offsetHeight ?? 0)
  }, [])

  return { height, ref }
}
