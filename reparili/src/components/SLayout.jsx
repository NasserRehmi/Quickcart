import SideBar from "./SideBar"
const SLayout = ({children}) => {
  return (
    <>
    <SideBar/>
    <main style={{ overflowY: "auto", minHeight: "100vh" }}>
          {children}
        </main>
    </>
  )
}

export default SLayout