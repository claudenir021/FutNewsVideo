import { useState } from "react";

export default function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateVideo = async () => {
    setLoading(true);
    setVideoUrl(""); // limpa o vídeo anterior

    const response = await fetch("https://futnewsvideo.onrender.com/generate-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team: "Flamengo",
        title: "Vitória Importante",
        text: "O Flamengo venceu o clássico com um gol nos acréscimos!",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setVideoUrl(data.video_path);
    } else {
      alert("Erro ao gerar vídeo: " + data.detail);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>FutNewsVideo</h1>
      <button onClick={handleGenerateVideo} disabled={loading}>
        {loading ? "Gerando vídeo..." : "Gerar vídeo de notícia"}
      </button>

      <h2>Vídeo Gerado:</h2>
      {videoUrl ? (
        <video width="640" height="360" controls>
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      ) : (
        !loading && <p>Nenhum vídeo gerado ainda.</p>
      )}
    </div>
  );
}
