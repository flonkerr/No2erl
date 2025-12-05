import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center justify-center
                 w-10 h-10 bg-white rounded-md
                 "
      >
        <ArrowLeft size={20} strokeWidth={2.5} />
      </Link>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">REGISTER</h1>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            REGISTER
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="font-bold text-gray-900 hover:underline">
            Login
          </a>
        </p>
      </div>

      <div className="w-1/2 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          className="w-full h-full object-cover"
          alt="Register background"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
