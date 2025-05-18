import React, { useState } from 'react';

export default function GeradorVideo() {
  const [mensagem, setMensagem] = useState('');

  const handleClick = async () => {
    try {
      setMensagem('Gerando vídeo...');
      const resposta = await fetch('https://futnewsvideo.onrender.com', {
        method: 'POST',
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        setMensagem(`Vídeo gerado com sucesso! Nome do arquivo: ${dados.arquivo}`);
      } else {
        setMensagem('Erro ao gerar o vídeo.');
      }
    } catch (erro) {
      setMensagem('Erro ao conectar com o servidor.');
      console.error(erro);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Gerar Vídeo
      </button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
