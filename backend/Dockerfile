FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/usr/local/bin:$PATH"

WORKDIR /app

# Install system dependencies + Node.js for frontend build
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the backend code first
COPY backend/ ./

# Build the frontend
COPY frontend/ /frontend/
WORKDIR /frontend
RUN npm install && npm run build
WORKDIR /app

# Copy built frontend into Django's staticfiles/frontend directory
RUN mkdir -p staticfiles/frontend && \
    cp -r /frontend/dist/* staticfiles/frontend/

# Ensure entrypoint is executable
RUN chmod +x entrypoint.sh

EXPOSE 8000

CMD ["bash", "entrypoint.sh"]
