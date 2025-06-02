import { useState } from 'react';
import './styles/index.css';

function App() {
  const [videoPath, setVideoPath] = useState('');
  const [loading, setLoading] = useState(false);

  const gerarVideo = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://futnewsvideo.onrender.com/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team: 'Corinthians',
          title: 'Grande Vitória',
          text: 'O Corinthians venceu mais uma no campeonato!',
        }),
      });

      const data = await response.json();

      if (response.ok && data.video_path) {
        const videoURL = `https://futnewsvideo.onrender.com/${data.video_path}`;
        setVideoPath(videoURL);
      } else {
        alert('Erro: ' + (data.detail || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao gerar vídeo:', error);
      alert('Erro ao gerar vídeo');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>FutNewsVideo</h1>

      <button onClick={gerarVideo} disabled={loading}>
        {loading ? 'Gerando vídeo...' : 'Gerar vídeo de notícia'}
      </button>

      {videoPath && (
        <div className="video-container">
          <h2>Vídeo Gerado:</h2>
          <video controls width="720" src={videoPath}></video>
        </div>
      )}
    </div>
  );
}

export default App;
