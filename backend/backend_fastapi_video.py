from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get('/')
def root():
    return {'message': 'API FutNewsVideo funcionando'}

@app.post('/gerar_video')
def gerar_video():
    # Aqui você colocará o código que realmente gera o vídeo
    # Por enquanto, vamos simular que gerou um vídeo com o nome fictício:
    nome_arquivo = "video_gerado.mp4"
    
    # Retornamos uma resposta JSON com o nome do vídeo
    return JSONResponse(content={"arquivo": nome_arquivo})

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Libera o acesso entre o frontend (Netlify) e o backend (Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://futnewsvideo.netlify.app"],  # URL do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

