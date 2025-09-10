import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative flex items-center px-16 py-5 font-sans bg-white border-b border-gray-300">
      
      <div className="flex-shrink-0">
        <div className="flex flex-col items-center text-sm text-gray-800">
          <span className="mt-1 tracking-[2px] font-medium">DIGITAL PROJECT</span>
        </div>
      </div>

      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-10">
        {[
          { to: "/", label: "MAIN" },
          { to: "/Gallery", label: "GALLERY" },
          { to: "/Projects", label: "OUR PROJECTS" },
          { to: "/Certifications", label: "CERTIFICATIONS" },
          { to: "/ContactUs", label: "CONTACTS" },
          { to: "/Product", label: "PRODUCTS" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="relative text-gray-900 text-sm tracking-[2px] font-medium no-underline 
                       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-black 
                       after:transition-all after:duration-300 hover:after:w-full"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex-shrink-0">
        <Link
          to="/profile"
          className="flex items-center gap-2 px-2 py-1"
        >
          <img
            src="https://placekitten.com/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
        </Link>
      </div>

    </header>
  );
}

export default Header;
