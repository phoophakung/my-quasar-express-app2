FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install --legacy-peer-deps
RUN npx quasar build -m spa
RUN npm install leaflet @types/leaflet
FROM nginx:1.27-alpine
COPY --from=builder /app/dist/spa /usr/share/nginx/html
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]