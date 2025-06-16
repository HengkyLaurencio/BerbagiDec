# 🌾 BerbagiDec — Aplikasi Berbagi Makanan untuk Mendukung SDGs: Zero Hunger

BerbagiDec adalah sebuah aplikasi mobile dan sistem backend yang dirancang untuk mengurangi pemborosan makanan dan mendistribusikan makanan berlebih kepada yang membutuhkan, mendukung tujuan Sustainable Development Goals (SDGs) nomor 2: Zero Hunger.

Aplikasi ini memungkinkan restoran atau mitra usaha untuk membagikan makanan berlebih kepada pengguna yang membutuhkan dengan cara yang efisien, transparan, dan berbasis komunitas.

---

## 🧪 Cara Menjalankan Proyek

### 1. Clone repositori

```bash
git clone https://github.com/HengkyLaurencio/BerbagiDec.git
cd BerbagiDec
```

### 2. Menjalankan Backend

```bash
cd backend
npm install
copy .env.example .env # edit .env sesuai dengan environment
npm run dev
```

### 3. Menjalankan Frontend (Expo)

```bash
cd frontend
npm install
npx expo start
```

---

## 📦 Isi Repositori

Repositori ini terdiri dari dua bagian utama:

```
BerbagiDec/
├── backend/      ← Backend REST API (Node.js, Express, Sequelize, PostgreSQL)
└── frontend/     ← Aplikasi Mobile (React Native + Expo Router)
```

---

## 🚀 Fitur Utama

### 👤 Otentikasi & Manajemen Pengguna

* Login & register untuk pengguna umum (CUSTOMER) dan mitra restoran (PARTNER)
* JWT-based authentication

### 🍱 Modul Makanan

* Partner dapat menambahkan makanan berlebih
* Pengguna dapat melihat makanan yang tersedia
* Fitur pencarian dan rekomendasi makanan terdekat (berbasis GPS)

### 🏪 Modul Restoran

* Partner dapat mendaftarkan restoran dan mengelola info restoran
* Informasi lokasi, jam buka/tutup, dan deskripsi restoran

### 💳 Transaksi

* Pencatatan setiap pengambilan makanan oleh pengguna
* Data historis untuk transparansi dan laporan distribusi makanan

---

## 🛠 Teknologi

### Backend

* Node.js + Express
* Sequelize ORM + PostgreSQL
* JSON Web Token (JWT) Authentication
* REST API dengan struktur feature-first

### Frontend

* React Native + Expo
* Expo Router
* Context API untuk otentikasi
* Navigasi berdasarkan role (CUSTOMER / PARTNER)
* Integrasi Maps untuk lokasi restoran & makanan

---

## 🌍 Dampak Sosial

Aplikasi ini dibangun sebagai inisiatif nyata untuk mendukung:

* 🎯 SDGs #2: Zero Hunger — dengan mendistribusikan makanan berlebih kepada masyarakat
* 🌱 Mengurangi food waste
* 🤝 Mendorong kolaborasi antara bisnis makanan dan komunitas

---

## 📸 Demo & Tampilan

Tangkapan layar & video demo akan segera ditambahkan.

---
