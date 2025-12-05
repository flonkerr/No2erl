import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <section className="px-10 py-16 bg-white">
      <h2 className="text-4xl mb-10 text-zinc-800 pl-26">
        Our <span className="text-black font-bold">Projects</span>
      </h2>

      {/* <hr className="border-gray-300 w-[1640px] mx-auto" />
      <br /> */}

      <div className="space-y-10">

        <div className="flex flex-row items-center bg-stone-100 max-w-[90%] mx-auto">

          <img
            src="https://images.adsttc.com/media/images/60f0/6831/1846/7a1c/f85a/127b/slideshow/01.jpg?1626368102"
            alt="Project"
            className="w-full md:w-1/2 h-[65vh] md:h-[70vh] object-cover"
          />

          <div className="p-6 flex flex-col justify-between h-[649px]">
            <h3 className="text-5xl font-light text-zinc-800 mb-4 text-left">Sample Project</h3>

            <p className="text-lg text-gray-600 text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, ipsum minus iusto deserunt repellendus facilis ipsa quo eligendi nihil perspiciatis unde deleniti velit! Obcaecati modi, dolores magni tempora harum laborum.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sint, dolorum nihil nulla eveniet id eius vitae nobis impedit sunt consequatur ipsum, aut porro, odio tempore repudiandae sed cumque debitis?
            </p>

            <div className="">
              <Link to="/ViewProject" className="px-6 py-3 text-lg border border-zinc-300 bg-white hover:bg-gray-50 transition transform hover:scale-105">
                View More
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-stone-100 max-w-[90%] mx-auto">
          <img
            src="https://images.adsttc.com/media/images/6928/6be7/080a/9a01/88c5/85d3/slideshow/ongang-3d-concrete-printing-bridge_23.jpg?1764256770"
            alt="Project 2"
            className="h-[70vh]"
          />
          <div className="p-6 flex flex-col justify-between h-[649px]">
            <h3 className="text-5xl font-light text-zinc-800 mb-4 text-left">Sample Project 2</h3>

            <p className="text-lg text-gray-600 text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, ipsum minus iusto deserunt repellendus facilis ipsa quo eligendi nihil perspiciatis unde deleniti velit! Obcaecati modi, dolores magni tempora harum laborum.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sint, dolorum nihil nulla eveniet id eius vitae nobis impedit sunt consequatur ipsum, aut porro, odio tempore repudiandae sed cumque debitis?
            </p>

            <div className="">
              <Link to="/ViewProject2" className="px-6 py-3 text-lg border border-zinc-300 bg-white hover:bg-gray-50 transition transform hover:scale-105">
                View More
              </Link>
            </div>
          </div>
        </div>


        <div className="flex flex-row items-center bg-stone-100 max-w-[90%] mx-auto">
          <img
            src="https://images.adsttc.com/media/images/6913/852f/11d9/5601/88ba/eade/slideshow/fluted-volume-studio-uf-plus-o_5.jpg?1762886983"
            alt="Project 2"
            className="w-full md:w-1/2 h-[65vh] md:h-[70vh] object-cover"
          />
          <div className="p-6 flex flex-col justify-between h-[649px]">
            <h3 className="text-5xl font-light text-zinc-800 mb-4 text-left">Sample Project 2</h3>

            <p className="text-lg text-gray-600 text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, ipsum minus iusto deserunt repellendus facilis ipsa quo eligendi nihil perspiciatis unde deleniti velit! Obcaecati modi, dolores magni tempora harum laborum.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sint, dolorum nihil nulla eveniet id eius vitae nobis impedit sunt consequatur ipsum, aut porro, odio tempore repudiandae sed cumque debitis?
            </p>

            <div className="">
              <Link to="/ViewProject3" className="px-6 py-3 text-lg border border-zinc-300 bg-white hover:bg-gray-50 transition transform hover:scale-105">
                View More
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
