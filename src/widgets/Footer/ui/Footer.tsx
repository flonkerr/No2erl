import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

        <div>
          <div className="text-3xl font-bold mb-2">LOGO</div>
          <p className="tracking-widest text-sm">DIGITAL PROJECT</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Main
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:underline">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contacts</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="block">1234 Sample Street</span>
              <span className="block">Austin Texas 78704</span>
            </li>
            <li>512.333.2222</li>
            <li>sampleemail@gmail.com</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Social Media</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="./pages/ui/Gallery" className="hover:underline">Instagram</a></li>
            <li><a href="./pages/ui/Gallery" className="hover:underline">Twitter</a></li>
            <li><a href="./pages/ui/Gallery" className="hover:underline">Linkeldn</a></li>
            <li><a href="https://github.com/flonkerr" className="hover:underline">Github</a></li><br />
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs   text-gray-500">
        © 2025 Digital projcet  
      </div>
    </footer>
  );
};

export default Footer;
