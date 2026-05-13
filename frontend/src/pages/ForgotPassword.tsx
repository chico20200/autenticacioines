import { useState } from "react";
import axios from "axios";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      setToken(data.resetToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Error al solicitar recuperación");
      } else {
        setMessage("Error al solicitar recuperación");
      }
    }
  };

  return (
    <section className="card">
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Correo"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <button>Solicitar recuperación</button>
      </form>
      <p>{message}</p>
      {token && <textarea readOnly value={token} />}
    </section>
  );
}

export default ForgotPassword;