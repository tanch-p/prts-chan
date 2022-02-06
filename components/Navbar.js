export const Navbar = ({open,setOpen}) => {
  return (
    <>
      <nav className="flex fixed w-full items-center justify-between px-6 h-16  text-gray-700 border-b border-gray-200 z-10">
        <div className="flex items-center">
          <button
            aria-label="Open Menu"
            className="mr-2"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          Header
        </div>
      </nav>
    </>
  );
};
