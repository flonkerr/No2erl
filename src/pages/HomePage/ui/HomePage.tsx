import { useState, useRef, useEffect } from "react";

const slides = [
  {
    title: "PROJECT",
    subtitle: "Lorum",
    image:
      "https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "PROJECT",
    subtitle: "Ipsum",
    image:
      "https://images.adsttc.com/media/images/61d3/919d/3e4b/3155/2e00/0013/medium_jpg/04_javier_agustin_rojas_villa_olimpica_IMG_7340_high_ok.jpg?1641255321",
  },
];

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const Homepage = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  };

  const nextSlide = () => {
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
  };

  return (
    <>
      <FadeInSection>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] w-full max-w-[1700px]">
            <div className="flex flex-col justify-center px-12 space-y-8">
              <div>
                <h2 className="text-gray-400 text-2xl tracking-widest">
                  {slides[current].title}
                </h2>
                <h1 className="text-5xl font-bold">
                  {slides[current].subtitle}
                </h1>
              </div>

              <div className="flex items-center space-x-5">
                <button
                  onClick={prevSlide}
                  className="border border-gray-300 px-4 py-2 text-lg hover:bg-gray-100 transition"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="border border-gray-300 px-4 py-2 text-lg hover:bg-gray-100 transition"
                >
                  →
                </button>
              </div>

              <div className="text-gray-400 text-base flex items-center space-x-2">
                <span className="text-black font-semibold">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span>/</span>
                <span>{String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="relative w-full h-[70vh]">
              <img
                src={slides[current].image}
                alt={slides[current].subtitle}
                className="w-full h-full object-cover"
              />

              <a
                href="#projects"
                className="absolute bottom-0 left-0 flex items-center justify-between bg-white/90 backdrop-blur-sm 
                           px-6 py-3 text-sm tracking-widest font-medium hover:bg-white transition"
              >
                <span>VIEW PROJECT</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <section className="bg-white py-16 px-6 md:px-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400"
                alt="About"
                className="w-full h-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=400"
                alt="About"
                className="w-full h-full object-cover row-span-2"
              />
              <img
                src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400"
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center lg:w-1/2">
              <h2 className="text-gray-400 text-4xl mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>

              <a
                href="#aboutus"
                className="group bg-white border px-6 py-3 text-sm tracking-widest font-medium flex items-center gap-2 w-fit
                           hover:bg-gray-50 hover:shadow-md transition"
              >
                READ MORE
                <span className="group-hover:translate-x-1 transition">→</span>
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="bg-white py-16 px-6 md:px-16">
          <div className="max-w-[1400px] mx-auto text-center mb-12">
            <h2 className="text-gray-400 text-4xl mb-6">
              Privacy and Security
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We prioritize protecting our clients' privacy and data security, adhering to the
              principle of confidentiality and professional standards in all our projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
            <div className="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-start">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full mb-6">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Data Privacy Protection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All project files and client information are stored securely with encrypted access. 
                We maintain strict confidentiality agreements and ensure your data remains private throughout our collaboration.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-start">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full mb-6">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Secure Communication
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Strict access control and encrypted transmission are enforced to prevent unauthorized 
                access and reduce exposure to security risks during all project communications.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-start">
              <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full mb-6">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Professional Standards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Client data and project details are handled with the highest professional standards, 
                with strict protocols in place to meet industry regulations and protect intellectual property.
              </p>
            </div>
          </div>
        </section>

        <section>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">150+</div>
                <div className="text-gray-500 text-sm tracking-widest">
                  PROJECTS COMPLETED
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-gray-500 text-sm tracking-widest">
                  CLIENT SATISFACTION
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-gray-500 text-sm tracking-widest">
                  YEARS EXPERIENCE
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-500 text-sm tracking-widest">
                  TEAM MEMBERS
                </div>
              </div>
            </div><br /><br />
        </section>
      </FadeInSection>
    </>
  );
};

export default Homepage;