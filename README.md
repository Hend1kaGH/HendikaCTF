# Web
echo ___  ___  _______   ________   ________  ___  ___  __    ________          ________ _________  ________ 
echo|\  \|\  \|\  ___ \ |\   ___  \|\   ___ \|\  \|\  \|\  \ |\   __  \        |\   ____\\___   ___\\  _____\
echo\ \  \\\  \ \   __/|\ \  \\ \  \ \  \_|\ \ \  \ \  \/  /|\ \  \|\  \       \ \  \___\|___ \  \_\ \  \__/ 
echo \ \   __  \ \  \_|/_\ \  \\ \  \ \  \ \\ \ \  \ \   ___  \ \   __  \       \ \  \       \ \  \ \ \   __\
echo  \ \  \ \  \ \  \_|\ \ \  \\ \  \ \  \_\\ \ \  \ \  \\ \  \ \  \ \  \       \ \  \____   \ \  \ \ \  \_|
echo   \ \__\ \__\ \_______\ \__\\ \__\ \_______\ \__\ \__\\ \__\ \__\ \__\       \ \_______\  \ \__\ \ \__\ 
echo    \|__|\|__|\|_______|\|__| \|__|\|_______|\|__|\|__| \|__|\|__|\|__|        \|_______|   \|__|  \|__| 
                                                                                                         
                                                                                                         
# 🛡️ HendikaCTF.OS - Cyber Security Challenge Platform

![HendikaCTF Banner](https://img.shields.io/badge/Status-Development-green?style=for-the-badge&logo=github)
![Tech](https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge)

**HendikaCTF.OS** adalah platform kompetisi Capture The Flag (CTF) berbasis web yang dirancang dengan estetika terminal retro. Platform ini dibuat untuk melatih kemampuan *problem-solving* dalam bidang keamanan siber melalui berbagai kategori tantangan.

---

## 🚀 Fitur Utama

* **Cyberpunk UI:** Antarmuka bergaya terminal klasik dengan efek Matrix dan CRT.
* **Security Built-in:** Implementasi pengamanan kode di sisi klien menggunakan *JavaScript Obfuscation*.
* **Irreversible Flags:** Flag disimpan menggunakan hash **SHA-512** sehingga mustahil di-intip melalui source code.
* **Scoreboard System:** Pelacakan skor otomatis untuk setiap user yang terdaftar.
* **Mobile Responsive:** Bisa diakses melalui perangkat seluler.

---

## 🛠️ Arsitektur Keamanan

Untuk menjaga integritas kompetisi, proyek ini menggunakan dua lapisan keamanan utama:

### 1. Flag Hashing (SHA-512)
Semua flag tidak disimpan dalam teks biasa. Kami menggunakan algoritma SHA-512 untuk memvalidasi input pengguna.
```javascript
// Contoh di data.js

flagHash: "cf83e1357eefb8bdf1542850d66d8007d620e40..." // Hasil hash, bukan flag asli                                                                                                         
