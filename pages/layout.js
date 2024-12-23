import Nav from "../src/components/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main className="dark:bg-background min-h-screen w-screen md:w-5/6 md:ml-[16.666667%]">
        {children}
      </main>
    </>
  );
};

export default Layout;
