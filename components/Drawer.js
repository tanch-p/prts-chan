const Drawer = ({ drawerOpen, setDrawerOpen, device }) => {
  const sidebarItems = [
    "Stages",
    "Calculations",
    "Weight Physics",
    "Credits",
    "Contact",
    "Settings",
  ];
  return (
    <>
      <aside
        className={`transform top-0 left-0 w-64 border border-slate-400 bg-white fixed h-screen overflow-auto ease-in-out transition-all duration-200 z-30
    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarItems.map((ele, index) => (
          <a
            className="flex items-center font-bold pt-5 pr-8 bg-white hover:bg-gray-300 hover:cursor-not-allowed"
            key={ele}
          >
            {ele}
          </a>
        ))}
      </aside>
      {device === "mobile" ? (
        <div
          id="nav_overlay"
          className={`top-0 left-0 fixed w-screen h-screen bg-gray-500 backdrop-blur-2 transition-opacity duration-30 ${
            drawerOpen ? "visible opacity-100" : "opacity-0 invisible"
          }`}
          onClick={() => setDrawerOpen(false)}
        ></div>
      ) : null}
    </>
  );
};

export default Drawer;
