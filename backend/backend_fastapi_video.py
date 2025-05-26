from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from moviepy.editor import TextClip, CompositeVideoClip
import datetime
import os

app = FastAPI()

# ✅ Atualizamos o modelo para aceitar team, title e text
class VideoRequest(BaseModel):
    team: str
    title: str
    text: str

# ✅ Atualizamos a função para usar os três campos
def generate_video(team: str, title: str, text: str) -> str:
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    nome_arquivo = f"{team}_{timestamp}.mp4"
    caminho_arquivo = os.path.join("videos", nome_arquivo)

    os.makedirs("videos", exist_ok=True)

    conteudo = f"{team.upper()}\n{title}\n{text}"
    clip_texto = TextClip(conteudo, fontsize=50, color='white', size=(720, 480), method='caption')
    clip_texto = clip_texto.set_duration(5)

    video = CompositeVideoClip([clip_texto])
    video.write_videofile(caminho_arquivo, fps=24)

    return caminho_arquivo

@app.get("/")
def root():
    return {"message": "API FutNewsVideo funcionando"}

# ✅ Endpoint atualizado para rota POST correta
@app.post("/generate-video")
def gerar_video_endpoint(request: VideoRequest):
    try:
        caminho = generate_video(request.team, request.title, request.text)
        nome_arquivo = os.path.basename(caminho)
        return JSONResponse(content={"video_path": f"videos/{nome_arquivo}"})
    except Exception as e:
        return JSONResponse(content={"detail": str(e)}, status_code=500)
