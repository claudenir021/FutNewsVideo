FROM python:3.10
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "backend_fastapi_video:app", "--host", "0.0.0.0", "--port", "8000"]