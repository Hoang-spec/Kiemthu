# --- server/Dockerfile ---

# 1. Dùng Node image nhẹ
FROM node:20-alpine

# 2. Tạo thư mục làm việc
WORKDIR /app

# 3. Copy package.json trước để tận dụng cache
COPY package*.json ./

# 4. Cài đặt dependencies (dùng npm ci cho production hoặc npm install)
RUN npm install

# 5. Copy toàn bộ code server vào container
COPY . .

# 6. Mở port 5000 (Port server của bạn)
EXPOSE 5000

# 7. Lệnh chạy server (Sửa 'start' nếu script trong package.json tên khác)
CMD ["npm", "run", "start"]