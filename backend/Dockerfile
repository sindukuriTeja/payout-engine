FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/usr/local/bin:$PATH"

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY backend/requirements.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ ./

# Create static directory
RUN mkdir -p staticfiles

# Ensure entrypoint is executable
RUN chmod +x entrypoint.sh

EXPOSE 8000

# Production command
CMD ["bash", "entrypoint.sh"]
