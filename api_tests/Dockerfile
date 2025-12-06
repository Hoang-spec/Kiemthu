FROM python:3.9-alpine

WORKDIR /app

# Copy file thư viện và cài đặt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ code test vào container
COPY . .

# Tạo sẵn thư mục logs và reports bên trong để tránh lỗi quyền
RUN mkdir -p /app/logs /app/reports

CMD ["pytest"]