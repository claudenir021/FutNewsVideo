import React, { useState } from 'react';
import capa from './assets/capa.png';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const gerarVideo = async () => {
    setLoading(true);
    setVideoUrl('');
    try {
      const response = await fetch('https://futnewsvideo.onrender.com/gerar-video');
      const data = await response.json();
      setVideoUrl(data.video_url);
    } catch (error) {
      console.error('Erro ao gerar vídeo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center text-white px-4">
      <img
        src={capa}
        alt="Imagem de Capa do FutNewsVideo"
        className="w-full max-h-[400px] object-cover"
      />
      <h1 className="text-4xl mt-6 font-bold">FutNewsVideo ⚽🎥</h1>
      <p className="text-xl mt-2 mb-6">As notícias do seu time, virando vídeo!</p>

      <button
        onClick={gerarVideo}
        className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        disabled={loading}
      >
        {loading ? 'Gerando vídeo...' : 'Gerar Vídeo'}
      </button>

      {loading && <p className="mt-4 animate-pulse">Por favor, aguarde...</p>}

      {videoUrl && (
        <video controls className="mt-6 w-full max-w-2xl rounded-xl shadow-lg">
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
      )}
    </div>
  );
}
