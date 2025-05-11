import { useState } from "react";
import axios from "axios";

export default function GeradorVideo() {
  const [status, setStatus] = useState("Aguardando envio...");

  const gerarVideo = async () => {
    setStatus("Enviando para a API...");

    try {
      const resposta = await axios.post(
        "https://futnewsvideo.onrender.com/gerar-video",
        {
          titulo: "Notícia de teste",
          texto: "Esse é um exemplo de chamada para a API",
        }
      );

      if (resposta.status === 200) {
        setStatus("✅ Vídeo gerado com sucesso!");
      } else {
        setStatus("⚠️ Erro ao gerar vídeo.");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      setStatus("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Gerador de Vídeo</h2>
      <button onClick={gerarVideo}>Gerar Vídeo</button>
      <p>Status: {status}</p>
    </div>
  );
}
