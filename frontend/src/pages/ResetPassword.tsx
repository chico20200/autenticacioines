import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { resetPassword } from "../services/authService";

function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await resetPassword(token!, newPassword);
      setMessage(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Error al cambiar contraseña");
      } else {
        setMessage("Error al cambiar contraseña");
      }
    }
  };

  return (
    <section className="card">
      <h2>Nueva contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
        />
        <button>Cambiar contraseña</button>
      </form>
      <p>{message}</p>
    </section>
  );
}

export default ResetPassword;