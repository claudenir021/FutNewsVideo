import React, { useState } from 'react';
import capa from './assets/Capa.png';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState('Palmeiras');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const gerarVideo = async () => {
    setLoading(true);
    setVideoUrl('');
    try {
      const response = await fetch('https://futnewsvideo.onrender.com/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team, title, text }),
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
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center text-white px-4 py-8">
      <img
        src={capa}
        alt="Imagem de Capa do FutNewsVideo"
        className="w-full max-h-[400px] object-cover rounded-xl shadow-xl"
      />
      <h1 className="text-4xl mt-6 font-bold">FutNewsVideo ⚽🎥</h1>
      <p className="text-xl mt-2 mb-6">As notícias do seu time, virando vídeo!</p>

      <div className="w-full max-w-2xl space-y-4">
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="Nome do time"
          className="w-full p-3 rounded text-black"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da notícia"
          className="w-full p-3 rounded text-black"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Texto da notícia"
          rows={4}
          className="w-full p-3 rounded text-black"
        />

        <button
          onClick={gerarVideo}
          className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition w-full"
          disabled={loading}
        >
          {loading ? 'Gerando vídeo...' : 'Gerar Vídeo'}
        </button>
      </div>

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
