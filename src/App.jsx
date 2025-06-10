import React, { useState } from 'react';
import capa from './assets/capa.png';

export default function App() {
  const [videoBase64, setVideoBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerarVideo = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://futnewsvideo.onrender.com/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          team: 'Corinthians',
          title: 'Grande Vitória!',
          text: 'O Corinthians venceu mais uma partida emocionante.'
        })
      });

      const data = await response.json();
      if (data.video_base64) {
        setVideoBase64(data.video_base64);
      } else {
        alert('Erro ao receber o vídeo.');
      }
    } catch (error) {
      console.error('Erro ao gerar vídeo:', error);
      alert('Ocorreu um erro ao tentar gerar o vídeo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center text-white px-4">
      <img
        src={capa}
        alt="Imagem de Capa do FutNewsVideo"
        className="w-full max-h-[400px] object-cover rounded-xl shadow-lg"
      />
      <h1 className="text-4xl mt-6 font-bold">FutNewsVideo ⚽🎥</h1>
      <p className="text-xl mt-2 mb-4">As notícias do seu time, virando vídeo!</p>

      <button
        onClick={gerarVideo}
        className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition"
        disabled={loading}
      >
        {loading ? 'Gerando vídeo...' : 'Gerar Vídeo'}
      </button>

      {videoBase64 && (
        <video
          className="mt-6 rounded-lg shadow-lg max-w-full"
          controls
          src={`data:video/mp4;base64,${videoBase64}`}
        >
          Seu navegador não suporta a tag de vídeo.
        </video>
      )}
    </div>
  );
}
