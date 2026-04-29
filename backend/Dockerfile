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

# Build the frontend
COPY frontend/ /frontend/
WORKDIR /frontend
RUN npm install && npm run build
WORKDIR /app

# Copy built frontend into Django's static serving path
RUN mkdir -p staticfiles/frontend
RUN cp -r /frontend/dist/* staticfiles/frontend/

# Copy the backend code
COPY backend/ ./

# Create static directory
RUN mkdir -p staticfiles

# Copy frontend build into the final staticfiles location
RUN cp -r /frontend/dist/* staticfiles/frontend/ 2>/dev/null || true

# Ensure entrypoint is executable
RUN chmod +x entrypoint.sh

EXPOSE 8000

CMD ["bash", "entrypoint.sh"]
