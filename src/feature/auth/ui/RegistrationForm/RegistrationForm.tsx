import { useState } from "react";
import { useRegisterMutation } from "../../model/authApi";
import type { RegisterRequest } from "../../model/type";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await register(form).unwrap();
      console.log("Форма отправлена:", response);
      alert(`Регистрация успешна!\nДобро пожаловать, ${form.username}!`);

      setForm({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
      });
        navigate("/");
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      alert("Ошибка при регистрации!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label><br />
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="surname">Surname</label><br />
          <input
            type="text"
            id="surname"
            name="surname"
            required
            value={form.surname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="username">Username</label><br />
          <input
            type="text"
            id="username"
            name="username"
            required
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: 10 }} disabled={isLoading}>
          {isLoading ? "Регистрация..." : "Register"}
        </button>

        {error && <p style={{ color: "red" }}>Ошибка регистрации</p>}
      </form>
    </div>
  );
}
