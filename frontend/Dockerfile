FROM node:20-slim

WORKDIR /app

# Build context should be the repository root
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

EXPOSE 5173

CMD ["npm", "run", "dev"]
