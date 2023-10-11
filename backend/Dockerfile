FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app/backend
COPY . ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]