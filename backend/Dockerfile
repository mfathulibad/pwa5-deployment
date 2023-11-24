# Gunakan image Node.js versi 14
FROM node:16-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode backend ke dalam container
COPY . .


# Command untuk menjalankan aplikasi backend
CMD ["node", "index.js"]

