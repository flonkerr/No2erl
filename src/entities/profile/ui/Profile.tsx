// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// const ProfileMenu = () => {
//   const [user, setUser] = useState<{ username: string; email: string; avatar?: string } | null>(null);

//   useEffect(() => {
//     const loggedUser = localStorage.getItem("loggedInUser");
//     if (loggedUser) {
//       setUser(JSON.parse(loggedUser));
//     }
//   }, []);

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-white px-6 md:px-16 py-16 flex gap-12">

//       <div className="w-64 flex-shrink-0 flex flex-col items-center border-r border-gray-200 pr-6">
//         <img
//           src={user?.avatar || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80"}
//           alt="Profile"
//           className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover mb-4"
//         />
//         <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.username || "Your Name"}</h1>
//         <p className="text-gray-500 text-sm tracking-widest mb-8">{user?.email || "email@example.com"}</p>

//         <div className="flex flex-col w-full space-y-3">
//           <Link
//             to="/profile/mailbox"
//             className="block w-full px-4 py-2 text-gray-900 font-medium tracking-widest rounded hover:bg-gray-50 transition"
//           >
//             Mailbox
//           </Link>
//           <Link
//             to="/profile/chat"
//             className="block w-full px-4 py-2 text-gray-900 font-medium tracking-widest rounded hover:bg-gray-50 transition"
//           >
//             Messages
//           </Link>
//           <Link
//             to="/profile/setting"
//             className="block w-full px-4 py-2 text-gray-900 font-medium tracking-widest rounded hover:bg-gray-50 transition"
//           >
//             Settings
//           </Link>
//           <Link
//             to="/#"
//             className="px-4 py-2 text-red-700 border font-medium tracking-widest rounded mt-10"
//           >
//             Logout
//           </Link>
//         </div>
//       </div>

//       <div className="flex-1">
//         <h2 className="text-gray-400 text-4xl mb-6">
//           Welcome{user ? `, ${user.username}` : ""}
//         </h2>
//         {/* <p className="text-gray-600 leading-relaxed mb-6">
//           Here you can manage your account, see your orders, messages, and personal settings. 
//           Everything is designed to keep your experience simple and secure.
//         </p> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="p-6 border border-gray-200 rounded">
//             <h3 className="text-gray-800 font-semibold mb-2">Notifications</h3>
//             {/* <p className="text-gray-500 text-sm">You have 3 recent orders.</p> */}
//           </div>
//           <div className="p-6 border border-gray-200 rounded">
//             <h3 className="text-gray-800 font-semibold mb-2">Recent messages</h3>
//             {/* <p className="text-gray-500 text-sm">You have 5 unread messages.</p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileMenu;
