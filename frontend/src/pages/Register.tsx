import { useState } from "react";
import { registerUser } from "../services/authService";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const [form, setForm] = useState<RegisterForm>({ name: "", email: "", password: "" });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      setMessage(data.message);
    } catch (error) {
      if (error instanceof Error && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        setMessage(axiosError.response?.data?.message || "Error al registrar");
      } else {
        setMessage("Error al registrar");
      }
    }
  };

  return (
    <section className="card">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>
    </section>
  );
}

export default Register;