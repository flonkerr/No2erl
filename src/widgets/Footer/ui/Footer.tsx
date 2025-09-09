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
            <li><a href="#" className="hover:underline">Main</a></li>
            <li><a href="#" className="hover:underline">Gallery</a></li>
            <li><a href="#" className="hover:underline">Projects</a></li>
            <li><a href="#" className="hover:underline">Certifications</a></li>
            <li><a href="#" className="hover:underline">Contacts</a></li>
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
          <div className="flex space-x-4 text-xl">
          </div>
        </div>

      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
        © 2021 All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
