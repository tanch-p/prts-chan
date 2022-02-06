const Drawer = ({ open, setOpen, device }) => {
  const sidebarItems = ["Stages", "Calculations", "Settings"];
  return (
    <>
      <aside
        className={`transform top-0 left-0 w-64 bg-white fixed h-screen overflow-auto ease-in-out transition-all duration-200 z-30
    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarItems.map((ele, index) => (
          <a className="flex items-center font-bold pt-5 pr-8 bg-white hover:bg-gray-300" key={ele}>
            {ele}
          </a>
        ))}
      </aside>
      {device === "mobile" ? (
        <div
          id="nav_overlay"
          className={`top-0 left-0 fixed w-screen h-screen bg-gray-500 backdrop-blur-2 transition-opacity duration-30 ${
            open ? "visible opacity-100" : "opacity-0 invisible"
          }`}
          onClick={() => setOpen(false)}
        ></div>
      ) : null}
    </>
  );
};

export default Drawer;