import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const ref = useRef();
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
      className={`transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      {children}
    </div>
  );
};

const Homepage = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
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
                <h1 className="text-5xl font-bold">{slides[current].subtitle}</h1>
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
                href="#"
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
                alt=""
                className="w-full h-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=400"
                alt=""
                className="w-full h-full object-cover col-span-1 row-span-2"
              />
              <img
                src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center lg:w-1/2">
              <h2 className="text-gray-400 text-4xl mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <Link
                to="/aboutus"
                className="group bg-white border px-6 py-3 text-sm tracking-widest font-medium flex items-center gap-2 w-fit
             transition duration-300 ease-in-out
             hover:bg-gray-50 hover:shadow-md"
              >
                READ MORE
                <span
                  className="inline-block transform transition duration-300 ease-in-out
               group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="bg-white py-16 px-6 md:px-16">
          <h2 className="text-gray-400 text-4xl mb-12">
            Main Focus/Mission Statement
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <span className="text-gray-200 text-[100px] font-bold leading-none">
                1
              </span>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                efficitur, lectus et facilisis placerat.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="text-gray-200 text-[100px] font-bold leading-none">
                2
              </span>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                efficitur, lectus et facilisis placerat, magna mauris porttitor
                tortor, a auctor est felis ut nisl.
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
};

export default Homepage;
