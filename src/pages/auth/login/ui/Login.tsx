import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 


const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No registered user found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Email or password is incorrect.");
    }
  };

  return (
    <div className="flex h-screen">
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center justify-center
                 w-10 h-10 bg-white rounded-md
                 hover:bg-neutral-100 active:scale-95 transition"
      >
        <ArrowLeft size={20} strokeWidth={2.5} />
      </Link>
      
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">LOGIN</h1>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            LOGIN
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="font-bold text-gray-900 hover:underline">
            Register
          </a>
        </p>
      </div>

      <div className="w-1/2 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
