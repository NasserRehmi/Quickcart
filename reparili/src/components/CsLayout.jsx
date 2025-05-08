import ClientSIdebar from "../components/ClientSIdeBar";
const CsLayout = ({ children }) => {
    return (
        <>
        <ClientSIdebar />
        <main style={{ overflowY: "auto", minHeight: "94vh" }}>
          {children}
        </main>
        </>
    );
  };
  export default CsLayout;