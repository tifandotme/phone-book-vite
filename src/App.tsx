import styled from "@emotion/styled"

const Header = styled.header({
  height: "100px",
  width: "100%",
  position: "fixed",
  top: "0px",
  backgroundColor: "lightgray",
  borderBottom: "1px solid red",
  marginLeft: "300px",
  zIndex: "sticky2",
})

const Sidebar = styled.aside({
  width: "300px",
  borderRight: "1px solid blue",
  position: "fixed",
  height: "100%",
  zIndex: 3,
})

const Main = styled.main({
  marginTop: "100px",
  marginLeft: "300px",
  border: "1px solid green",
})

export default function App() {
  return (
    <>
      <Sidebar>Sidebar</Sidebar>
      <Header>This is Header</Header>
      <Main>main</Main>
      <div css={{ fontSize: "2em", color: "purple", background: "red" }}>
        asd
      </div>
    </>
  )
}
