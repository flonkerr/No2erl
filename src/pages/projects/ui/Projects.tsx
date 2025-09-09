const Projects = () => {
  return (
    <section className="px-10 py-16 bg-white">
      <h2 className="text-3xl font-light mb-10">
        Our <span className="font-bold">Projects</span>
      </h2>

      <div className="space-y-10">
        {/* Project 1 */}
        <div className="flex flex-col md:flex-row items-center border rounded-lg overflow-hidden shadow-sm">
          <img
            src="https://picsum.photos/id/1018/600/400"
            alt="Project 1"
            className="w-full md:w-1/2 object-cover"
          />
          <div className="p-6 md:w-1/2">
            <h3 className="text-xl font-light mb-2">Sample Project</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s...
            </p>
            <button className="px-5 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100">
              View More →
            </button>
          </div>
        </div>

        {/* Project 2 */}
        <div className="flex flex-col md:flex-row items-center border rounded-lg overflow-hidden shadow-sm">
          <img
            src="https://picsum.photos/id/1025/600/400"
            alt="Project 2"
            className="w-full md:w-1/2 object-cover"
          />
          <div className="p-6 md:w-1/2">
            <h3 className="text-xl font-light mb-2">Sample Project 2</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s...
            </p>
            <button className="px-5 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100">
              View More →
            </button>
          </div>
        </div>

        {/* Project 3 */}
        <div className="flex flex-col md:flex-row items-center border rounded-lg overflow-hidden shadow-sm">
          <img
            src="https://picsum.photos/id/1043/600/400"
            alt="Project 3"
            className="w-full md:w-1/2 object-cover"
          />
          <div className="p-6 md:w-1/2">
            <h3 className="text-xl font-light mb-2">Sample Project 3</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s...
            </p>
            <button className="px-5 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100">
              View More →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
