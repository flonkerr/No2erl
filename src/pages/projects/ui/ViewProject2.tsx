import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectLayout() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto py-16">
                <div className="mb-20">
                    <p className="text-gray-400 text-4xl font-light mb-3 ">Sample</p>
                    <h1 className="text-4xl font-bold text-zinc-800 mb-16">Project 2</h1>



                    <div className="w-full h-[500px] mb-12 flex items-center justify-center rounded-md">
                        <img src="https://images.adsttc.com/media/images/6928/6be7/080a/9a01/88c5/85d3/slideshow/ongang-3d-concrete-printing-bridge_23.jpg?1764256770"
                            alt="1"
                            className="text-gray-500 text-base w-full h-[56vh] object-cover " />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
                        <div className="lg:col-span-2">
                            <div className=" bg-gray-300 flex items-center justify-center rounded-md">
                                <img src="https://images.adsttc.com/media/images/6928/69f8/049e/2200/0108/385a/slideshow/01.jpg?1764256306" alt="" />
                            </div>
                        </div>

                        <div className="lg:col-span-3 text-gray-600 text-base leading-relaxed space-y-6">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                            <p>
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem tempore at sint dolore exercitationem, quaerat nobis facilis soluta expedita ipsum. Eaque veritatis fugiat facere numquam tenetur officiis minus, reiciendis aliquam, consequatur natus recusandae atque illo nobis nostrum rem id, molestias blanditiis cumque? Magni quia quod tempore ipsum exercitationem aliquid reprehenderit sequi odit eos suscipit totam error sunt amet facilis magnam similique voluptatibus est beatae, vel dolores tempora ipsa. Voluptatibus, vel. Exercitationem voluptas distincti
                            </p>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                            <p>
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 grid-cols-2 gap-12">
                        <div className="flex items-center justify-center h-[400px] overflow-hidden bg-gray-200">
                            <img
                                src="https://images.adsttc.com/media/images/6928/69fb/049e/2200/0108/386e/slideshow/20.jpg?1764256495"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center justify-center h-[400px] overflow-hidden bg-gray-200">
                            <img
                                src="https://images.adsttc.com/media/images/6928/69fa/049e/2200/0108/386c/slideshow/18.jpg?1764256586"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <br /><br />
                    <div className="lg:col-span-3 text-gray-600 text-base leading-relaxed space-y-6">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>
                        <p>
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem tempore at sint dolore exercitationem, quaerat nobis facilis soluta expedita ipsum. Eaque veritatis fugiat facere numquam tenetur officiis minus, reiciendis aliquam, consequatur natus recusandae atque illo nobis nostrum rem id, molestias blanditiis cumque? Magni quia quod tempore ipsum exercitationem aliquid reprehenderit sequi odit eos suscipit totam error sunt amet facilis magnam similique voluptatibus est beatae, vel dolores tempora ipsa. Voluptatibus, vel. Exercitationem voluptas distincti
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>
                        <p>
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>

                </div>
            </div>

            <div className="py-4 flex  justify-between px-6 ">

                <Link
                    to="/viewProject"
                    className="flex items-center justify-center w-10 h-10 "
                >
                    <ArrowLeft size={22} strokeWidth={2.5} />
                </Link>

                <Link
                    to="/projects"
                    className="b text-black px-6 py-2 font-medium tracking-wider
                "
                >
                    Go Back
                </Link>

                <Link
                    to="/viewProject3"
                    className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition"
                >
                    <ArrowRight size={22} strokeWidth={2.5} />
                </Link>

            </div>
        </div>
    );
}
