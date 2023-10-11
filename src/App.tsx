import styled from "@emotion/styled"

import "./App.css"

const Section = styled.section`
  background: #333;
  color: #fff;
`

// this component has the same styles as Section but it renders an aside
const Aside = Section.withComponent("aside")

const Child = styled.div`
  color: red;
`

const Parent = styled.div`
  ${Child} {
    color: green;
  }
`

const Container = styled.div((props) => ({
  display: "flex",
  flexDirection: props.column && "column",
}))

export default function App() {
  return (
    <>
      <Container>This is my button</Container>
    </>
  )
}
