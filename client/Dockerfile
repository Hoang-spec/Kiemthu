# --- client/Dockerfile ---

# Giai đoạn 1: Build React/Vite
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Lưu ý: Vite sẽ tạo ra thư mục 'dist', Create-React-App tạo ra 'build'

# Giai đoạn 2: Chạy Nginx
FROM nginx:alpine
# Copy thư mục dist vừa build vào thư mục html của nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# (Tùy chọn) Cấu hình để Nginx hỗ trợ React Router (không bị lỗi 404 khi refresh)
RUN rm /etc/nginx/conf.d/default.conf
RUN printf 'server { listen 80; server_name _; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]