import React from 'react';

export default function GeradorVideo() {
  const handleClick = () => {
    alert("Função de gerar vídeo acionada!");
  };

  return (
    <div>
      <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Gerar Vídeo
      </button>
    </div>
  );
}
