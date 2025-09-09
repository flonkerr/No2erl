import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex justify-between items-center px-16 py-5 font-sans bg-white border-b border-gray-300">
      
      <div className="flex flex-col items-center text-sm text-gray-800">
        <div className="bars"></div>
        <span className="mt-1 tracking-[2px] font-medium">DIGITAL PROJECT</span>
      </div>

      
      <nav className="flex gap-10">
        {[
          { to: '/', label: 'MAIN' },
          { to: '/Gallery', label: 'GALLERY' },
          { to: '/Projects', label: 'PROJECTS' },
          { to: '/Certifications', label: 'CERTIFICATIONS' },
          { to: '/ContactUs', label: 'CONTACTS' },
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
    </header>
  );
}

export default Header;
