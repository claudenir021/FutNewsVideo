import React, { useState } from 'react';

export default function GeradorVideo() {
  const [mensagem, setMensagem] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const handleClick = async () => {
    try {
      setMensagem('Gerando vídeo...');
      setVideoURL('');

      const resposta = await fetch('https://futnewsvideo.onrender.com/gerar_video', {
        method: 'POST',
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        const url = `https://futnewsvideo.onrender.com/videos/${dados.arquivo}`;
        setMensagem('Vídeo gerado com sucesso!');
        setVideoURL(url);
      } else {
        setMensagem('Erro ao gerar o vídeo.');
      }
    } catch (erro) {
      setMensagem('Erro ao conectar com o servidor.');
      console.error(erro);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1E90FF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Gerar Vídeo
      </button>

      {mensagem && <p style={{ marginTop: '15px' }}>{mensagem}</p>}

      {videoURL && (
        <video
          src={videoURL}
          controls
          autoPlay
          style={{ marginTop: '20px', maxWidth: '100%' }}
        />
      )}
    </div>
  );
}
