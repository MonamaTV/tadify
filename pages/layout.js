import Nav from "../src/components/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main className="dark:bg-[#191414] w-screen md:w-5/6 md:ml-[16.666667%]">
        {children}
      </main>
    </>
  );
};

export default Layout;
