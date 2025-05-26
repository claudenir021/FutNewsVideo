import React, { useState } from 'react';
import capa from './assets/capa.png';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeSelecionado, setTimeSelecionado] = useState('Palmeiras');

  const gerarVideo = async () => {
    setLoading(true);
    setVideoUrl('');
    try {
      const response = await fetch('https://futnewsvideo.onrender.com/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team: timeSelecionado,
          title: `Notícia do ${timeSelecionado}`,
          text: `${timeSelecionado} brilhou em campo hoje!`,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setVideoUrl(`https://futnewsvideo.onrender.com/${data.video_path}`);
      } else {
        console.error('Erro do backend:', data.detail);
      }
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
      <p className="text-xl mt-2 mb-4">As notícias do seu time, virando vídeo!</p>

      {/* Dropdown de seleção de time */}
      <select
        value={timeSelecionado}
        onChange={(e) => setTimeSelecionado(e.target.value)}
        className="text-black px-4 py-2 rounded-md mb-4"
      >
        <option value="Palmeiras">Palmeiras</option>
        <option value="Flamengo">Flamengo</option>
        <option value="Corinthians">Corinthians</option>
        <option value="São Paulo">São Paulo</option>
        <option value="Grêmio">Grêmio</option>
        <option value="Atlético Mineiro">Atlético Mineiro</option>
        <option value="Internacional">Internacional</option>
      </select>

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
