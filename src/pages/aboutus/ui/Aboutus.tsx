

const teamMembers = [
  { name: "Alice Johnson", role: "Project Manager", image: "https://t4.ftcdn.net/jpg/01/71/34/07/360_F_171340787_l9S7MMBXyNREOqO21Zdbi7ZgzGRWvhKW.jpg" },
  { name: "Bob Smith", role: "Lead Designer", image: "https://thumbs.dreamstime.com/b/african-office-worker-portrait-handsome-male-talking-phone-44341693.jpg" },
  { name: "Charlie Lee", role: "Developer", image: "https://images.pexels.com/photos/5196821/pexels-photo-5196821.jpeg?cs=srgb&dl=pexels-anntarazevich-5196821.jpg&fm=jpg" },
  { name: "Diana Prince", role: "Marketing", image: "https://t3.ftcdn.net/jpg/03/58/93/04/360_F_358930412_rodvr4vvY4LG0bUG8MKC3wwCZhWGozcW.jpg" },
  { name: "Ethan Hunt", role: "UI/UX Designer", image: "https://thumbs.dreamstime.com/b/black-construction-worker-18075617.jpg" },
  { name: "Fiona Gallagher", role: "Content Strategist", image: "https://img.freepik.com/free-photo/empowered-business-woman-office_23-2149279608.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "George Martin", role: "Frontend Developer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZsMFMHdflof2PY42UjAe_dKrDJH_H8NWP5A&s" },
  { name: "Hannah Baker", role: "QA Engineer", image: "https://cdn.sourceflow.co.uk/adkaqu3hwx2hjr24e9fzlav3tg29" },
];


export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
 

      <section className="flex flex-col items-center justify-center text-center py-24 px-6 md:px-16 bg-zinc-50">
        <h1 className="text-zinc-700 text-5xl mb-4 tracking-widest">ABOUT US</h1>
        <p className="text-zinc-600 max-w-2xl leading-relaxed text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur impedit dolorum aut! Ipsa distinctio est quos. Ex dolorum dignissimos sequi assumenda, neque voluptatem culpa nam consectetur rem quibusdam aliquid! Delectus.
        </p>
      </section>

      <section className="py-16 px-6 md:px-16">
        <h2 className="text-zinc-600 text-4xl mb-12 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border border-gray-300"
              />
              <h3 className="text-gray-900 font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 px-6 md:px-16">
        <h2 className="text-gray-400 text-4xl mb-12 text-center">Our Mission & Values</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex gap-6">
            <span className="text-gray-200 text-[100px] font-bold leading-none">1</span>
            <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, repudiandae dolorem expedita et, earum nam quidem tenetur assumenda minima officiis culpa id quia porro enim, consectetur impedit dolor. Velit, non?
            </p>
          </div>
          <div className="flex gap-6">
            <span className="text-gray-200 text-[100px] font-bold leading-none">2</span>
            <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto totam magnam hic iste qui? Nam minus totam iste! Culpa eaque quibusdam error cum quas maiores commodi fugiat at, eligendi saepe.
            </p>
          </div>
          <div className="flex gap-6">
            <span className="text-gray-200 text-[100px] font-bold leading-none">3</span>
            <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi optio deserunt odio repudiandae! Dolor magnam illo minus. Dolor doloribus culpa cumque debitis impedit dolore quisquam ut officiis, eveniet aliquid obcaecati!
            </p>
          </div>
          <div className="flex gap-6">
            <span className="text-gray-200 text-[100px] font-bold leading-none">4</span>
            <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint deleniti voluptate illum delectus deserunt excepturi maxime placeat nulla facere, quisquam earum quod dolore error ut aspernatur quaerat consequuntur ratione quos?
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
