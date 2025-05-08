import SideBar from '../components/SideBar';
const SideLayout = ({ children }) => {
  return (
    <>
      <SideBar />
      <main style={{ overflowY: "auto", minHeight: "94vh" }}>
        {children}
      </main>
    </>
  );
};
export default SideLayout;