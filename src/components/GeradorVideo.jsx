import React, { useState } from 'react';

export default function GeradorVideo() {
  const [mensagem, setMensagem] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleClick = async () => {
    try {
      setMensagem('Gerando vídeo...');
      setVideoUrl('');

      const resposta = await fetch('https://futnewsvideo.onrender.com/gerar_video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: "Título de Exemplo",
          texto: "Texto da notícia de futebol.",
        }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        const urlDoVideo = `https://futnewsvideo.onrender.com/videos/${dados.arquivo}`;
        setVideoUrl(urlDoVideo);
        setMensagem('✅ Vídeo gerado com sucesso!');
      } else {
        setMensagem('❌ Erro ao gerar o vídeo.');
      }
    } catch (erro) {
      setMensagem('❌ Erro ao conectar com o servidor.');
      console.error(erro);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">FutNews Video</h1>

      <button
        onClick={handleClick}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-md transition duration-300"
      >
        Gerar Vídeo
      </button>

      {mensagem && (
        <p className="mt-4 text-gray-700 text-lg">{mensagem}</p>
      )}

      {videoUrl && (
        <video
          width="720"
          height="480"
          controls
          className="mt-6 border-2 border-gray-300 rounded"
        >
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>
      )}
    </div>
  );
}
