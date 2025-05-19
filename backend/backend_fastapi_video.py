from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://futnewsvideo.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return {'message': 'API FutNewsVideo funcionando'}

@app.post('/gerar_video')
def gerar_video():
    nome_arquivo = "video_gerado.mp4"
    return JSONResponse(content={"arquivo": nome_arquivo})
