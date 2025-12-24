
const ContactUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
        
        <div>
          <h2 className="text-gray-400 text-3xl mb-2">Contact</h2>
          <h1 className="text-4xl font-bold mb-6">Information</h1>

          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold">Company Name</p>
              <p className="text-gray-500">
                1234 Sample Street Austin Texas 76401
              </p>
            </div>

            <p className="font-semibold">512.333.2222</p>

            <p className="text-gray-500">sampleemail@gmail.com</p>
          </div>

          {/* <a
            href="/contact"
            className="inline-block mt-8 bg-black text-white px-6 py-3 tracking-widest text-sm hover:bg-gray-800 transition"
          >
            CONTACT US
          </a> */}
        </div>

        <div>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.608540353672!2d-97.74369958488372!3d30.267153981802834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a44c32a76d%3A0xcee4368b8b1c0b93!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1681010101010!5m2!1sen!2sus"
            className="w-full h-[400px] border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
 
