import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { verifyAccount } from "../services/authService";

function VerifyAccount() {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState<string>("Verificando cuenta...");

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await verifyAccount(token!);
        setMessage(data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || "Error al verificar cuenta");
        } else {
          setMessage("Error al verificar cuenta");
        }
      }
    };

    verify();
  }, [token]);

  return (
    <section className="card">
      <h2>Verificación</h2>
      <p>{message}</p>
    </section>
  );
}

export default VerifyAccount;