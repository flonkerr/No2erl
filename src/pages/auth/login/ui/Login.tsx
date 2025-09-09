const LoginPage = (props: any) => {
  const { setPassword, setEmail, handleSubmit } = props;

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">LOGIN</h1>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
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
