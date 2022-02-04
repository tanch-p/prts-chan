export const Navbar = () => {
  const isOpen = true;
  return (
    <>
      <nav className="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
        <section>
          <aside
            className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            
          </aside>
        </section>
        <section></section>
      </nav>
    </>
  );
};
