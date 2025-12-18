// --- SECURITY CHECK (Taruh di paling atas) ---
(function checkAuth() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html"; // Lempar balik ke login jika belum auth
    }
})();

// Fungsi Logout (Bisa dipasang di tombol navbar baru)
function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

const aboutText = `
CTF (Capture The Flag) adalah kompetisi keamanan siber
di mana peserta memecahkan berbagai tantangan seperti
cryptography, web exploitation, forensics, dan reverse engineering.

Setiap tantangan memiliki sebuah "FLAG"
yang harus ditemukan untuk mendapatkan poin.

Think like a hacker.
Learn by breaking.
Have fun.
`;

// --- 2. SISTEM AUDIO ---
const sfxHover = document.getElementById('sfx-hover');
const sfxClick = document.getElementById('sfx-click');
const sfxSuccess = document.getElementById('sfx-success');


function playHover() {
    if (sfxHover) {
        sfxHover.currentTime = 0;
        sfxHover.play().catch(() => {});
    }
}

function playClick() {
    if (sfxClick) {
        sfxClick.currentTime = 0;
        sfxClick.play().catch(() => {});
    }
}

// --- 3. LOGIKA NAVIGASI HALAMAN ---
let currentChallengeId = null;

function changePage(pageId) {
    if (typeof playClick === "function") playClick();

    // 1. Sembunyiin semua section page
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.classList.add('hidden');
    });

    // 2. Bersihkan status active dari semua button navigasi
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
    });

    // 3. Munculkan page yang dipilih
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        setTimeout(() => target.classList.add('active'), 10);
    }

    // 4. Nyalakan button di navbar sesuai ID yang kita buat di HTML tadi
    const navBtn = document.getElementById('nav-' + pageId);
    if (navBtn) {
        navBtn.classList.add('active');
    }

    // Logic khusus page tertentu
    if (pageId === 'missions' && typeof renderMissions === "function") renderMissions();
    if (pageId === 'scoreboard' && typeof renderScoreboard === "function") renderScoreboard();
    if (pageId === 'about' && typeof startAboutTyping === "function") {
        const aboutContainer = document.getElementById('about-text');
        if (aboutContainer) aboutContainer.innerHTML = ''; 
        setTimeout(startAboutTyping, 300);
    }
}

// --- 4. RENDER KARTU TANTANGAN ---
// --- 1. FUNGSI RENDER (Update Panah & Teks) ---
function renderMissions() {
    const container = document.getElementById('mission-content');
    if (!container) return;

    const activeUsername = sessionStorage.getItem("currentUser");
    const user = userDatabase.find(u => u.user === activeUsername);

    container.innerHTML = "";
    const categories = [...new Set(challenges.map(c => c.cat))];

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = "category-group";
        
        const missionsHTML = challenges.filter(c => c.cat === cat).map(c => {
            const isSolved = user && user.solved && user.solved.includes(c.id);
            const statusClass = isSolved ? "is-solved" : "";
            const coinText = isSolved ? "DONE" : c.pts;

            return `
                <div class="card-pixel ${statusClass}" onclick="openModal(${c.id})" onmouseenter="playHover()">
                    <h4>${c.title}</h4>
                    <div style="display: flex; align-items: center; gap: 8px; z-index: 2;">
                        <img src="assets/coin.png" style="width: 16px; height: 16px; image-rendering: pixelated;">
                        <span style="color: #ffd700; font-size: 10px; font-family: 'Press Start 2P';">${coinText}</span>
                    </div>
                </div>
            `;
        }).join('');

        section.innerHTML = `
            <span class="cat-label-retro"><span class="cat-arrow">»</span> ${cat}</span>
            <div class="mission-grid-rect">${missionsHTML}</div>
        `;
        container.appendChild(section);
    });
}

// --- 2. FUNGSI SUBMIT (Anti-Bug Koin) ---
function submitFlag() {
    const userInput = document.getElementById('flag-input').value.trim();
    const currentMission = challenges.find(m => m.id === currentChallengeId);
    const activeUsername = sessionStorage.getItem("currentUser");
    const user = userDatabase.find(u => u.user === activeUsername);

    // --- LOGIKA KEAMANAN BARU ---
    // Ubah input user menjadi SHA-512 sebelum dibandingkan
    const hashedInput = sha512(userInput); 

    // Sekarang kita bandingkan hasil HASH, bukan teks polos
    if (currentMission && hashedInput === currentMission.flagHash) {
        if (!user) return;

        // PROTEKSI: Satu akun satu kali koin
        if (user.solved && user.solved.includes(currentChallengeId)) {
            if (typeof playClick === "function") playClick();
            showAlert("ALREADY SOLVED", "Poin sudah pernah diambil!", false);
            closeModal();
            return;
        }

        if (document.getElementById('sfx-success')) document.getElementById('sfx-success').play();
        
        if (!user.solved) user.solved = [];
        user.solved.push(currentChallengeId); 
        user.score += currentMission.pts;

        showAlert("ACCESS GRANTED", `SUCCESS! +${currentMission.pts} COINS ADDED.`, true);
        closeModal();
        
        initUserSession(); 
        if (typeof renderScoreboard === 'function') renderScoreboard();
        renderMissions();   
    } else {
        if (typeof playClick === "function") playClick();
        showAlert("ACCESS DENIED", "FLAG SALAH ATAU KODE TIDAK VALID!");
    }
}

// --- 5. LOGIKA MODAL ---
function openModal(id) {
    playClick();
    currentChallengeId = id;

    const data = challenges.find(x => x.id === id);
    if (!data) return;

    document.getElementById('m-title').innerText = data.title;
    document.getElementById('m-cat').innerText = data.cat;
    
    // Mapping link DAN NAMA untuk setiap challenge
    const linkConfig = {
        1: { 
            url: 'https://hend1kagh.github.io/Mr-Cookie/',
            name: 'Buka Challenge MrCookie 🍪'
        },
        2: { 
            url: 'https://www.base64decode.org/',
            name: 'Decode Base64 Online 🔐'
        },
        3: { 
            url: 'https://en.wikipedia.org/wiki/XOR_cipher',
            name: 'Pelajari XOR Cipher 🧩'
        },
        4: { 
            url: 'https://cryptii.com/',
            name: 'Tools Kriptografi 🔧'
        },
        5: { 
            url: 'https://exiftool.org/',
            name: 'Analisis Metadata 📷'
        },
        6: { 
            url: 'https://www.wireshark.org/',
            name: 'Download Wireshark 🌐'
        },
        7: { 
            url: 'https://ghidra-sre.org/',
            name: 'Reverse Engineering ⚙️'
        },
        8: { 
            url: 'https://crackstation.net/',
            name: 'Crack Hash Online 🔓'
        },
        9: { 
            url: 'https://ctftime.org/ctf-wtf/',
            name: 'Learn About CTF 🏆'
        }
    };
    
    const linkInfo = linkConfig[id];
    
    // BUAT DESKRIPSI DENGAN LINK INTERAKTIF
    const descElement = document.getElementById('m-desc');
    
    // Escape deskripsi untuk mencegah XSS
    let descHTML = data.desc.replace(/&/g, '&amp;')
                           .replace(/</g, '&lt;')
                           .replace(/>/g, '&gt;')
                           .replace(/\n/g, '<br>');
    
    // Jika ada link untuk challenge ini, tambahkan ke deskripsi
    if (linkInfo && linkInfo.url) {
        // Escape URL untuk keamanan
        const safeUrl = linkInfo.url.replace(/"/g, '&quot;');
        const safeName = linkInfo.name.replace(/"/g, '&quot;');
        
        // Tambahkan link interaktif di akhir deskripsi
        descHTML += '<br><br><a href="#" class="inline-desc-link" data-url="' + safeUrl + '" onclick="event.preventDefault(); playClick(); window.open(this.getAttribute(\'data-url\'), \'_blank\'); return false;" onmouseenter="playHover()" style="color: var(--cyan); text-decoration: none; border-bottom: 1px dotted var(--cyan); padding: 2px 0; font-size: 10px; transition: all 0.3s;">' + safeName + '</a>';
    }
    
    descElement.innerHTML = descHTML;
    
    document.getElementById('m-pts').innerText = data.pts;

    const downloadBtn = document.getElementById('m-link');
    if (data.file) {
        downloadBtn.href = data.file;
        downloadBtn.style.display = "inline-block";
    } else {
        downloadBtn.style.display = "none";
    }

    document.getElementById('flag-input').value = "";
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    playClick();
    document.getElementById('modal').classList.add('hidden');
}
// --- 6. LOGIKA SUBMIT FLAG & HINT ---
// --- FUNGSI KONTROL ALERT CUSTOM ---
function showAlert(title, message, isSuccess = false) {
    const alertModal = document.getElementById('custom-alert');
    const titleEl = document.getElementById('alert-title');
    const contentEl = document.getElementById('alert-content');
    
    titleEl.innerText = title;
    contentEl.innerText = message;
    
    // Ganti warna border berdasarkan sukses atau hint
    const card = alertModal.querySelector('.modal-card');
    if (isSuccess) {
        card.style.borderColor = "var(--pink)";
        card.style.boxShadow = "0 0 20px var(--pink)";
        document.getElementById('m-title').style.color = "var(--pink)";
    } else {
        card.style.borderColor = "var(--cyan)";
        card.style.boxShadow = "0 0 20px var(--cyan)";
    }

    alertModal.classList.remove('hidden');
}

function closeAlert() {
    playClick();
    document.getElementById('custom-alert').classList.add('hidden');
}


// --- UPDATE LOGIKA HINT ---
function showHint() {
    playClick();
    const data = challenges.find(x => x.id === currentChallengeId);

    if (data && data.hint) {
        showAlert("DECRYPTED HINT", data.hint);
    } else {
        showAlert("SYSTEM ERROR", "No hint available for this mission.");
    }
}

// --- 7. INIT ---
window.onload = () => {
    changePage('home');
};

// Update Jam Digital
setInterval(() => {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.innerText = new Date().toLocaleTimeString('en-GB');
    }
}, 1000);

function updateHeroDate() {
    const dateEl = document.querySelector('.hero-date'); // Mengambil elemen di HTML
    if (!dateEl) return;

    const sekarang = new Date();
    
    // Opsi format Indonesia
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Mengubah tanggal ke string format Indonesia (ID)
    const tanggalFormatted = sekarang.toLocaleDateString('id-ID', options).toUpperCase();
    
    dateEl.innerText = tanggalFormatted;
}

// Panggil fungsi ini saat window di-load
window.addEventListener('load', () => {
    updateHeroDate();
    // ... fungsi init lainnya
});

// Variabel untuk menyimpan interval typing agar bisa dihentikan jika perlu
let typingInterval;

function showAlert(title, message, isSuccess = false) {
    const alertModal = document.getElementById('custom-alert');
    const titleEl = document.getElementById('alert-title');
    const contentEl = document.getElementById('alert-content');
    const card = alertModal.querySelector('.modal-card');

    // Reset konten dan hentikan typing sebelumnya
    clearInterval(typingInterval);
    contentEl.innerText = "";
    
    titleEl.innerText = title;

    // Pengaturan warna tema (Pink untuk sukses, Cyan untuk hint)
    if (isSuccess) {
        card.style.borderColor = "var(--pink)";
        card.style.boxShadow = "0 0 20px var(--pink)";
        titleEl.parentElement.style.backgroundColor = "var(--pink)";
    } else {
        card.style.borderColor = "var(--cyan)";
        card.style.boxShadow = "0 0 20px var(--cyan)";
        titleEl.parentElement.style.backgroundColor = "var(--cyan)";
    }

    alertModal.classList.remove('hidden');

    // Efek Mengetik Otomatis
    let i = 0;
    typingInterval = setInterval(() => {
        if (i < message.length) {
            contentEl.innerText += message.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 30); // Kecepatan mengetik (30ms per karakter)
}

let aboutTypingInterval;

function startAboutTyping() {
    const textEl = document.getElementById("about-text-typing");
    if (!textEl) return;

    // Reset typing sebelumnya
    clearInterval(aboutTypingInterval);
    textEl.innerText = "";

    const voice = document.getElementById("sfx-char-voice");
    if (voice) {
        voice.currentTime = 0;
        voice.play().catch(() => {});
    }

    let i = 0;
    aboutTypingInterval = setInterval(() => {
        if (i < aboutText.length) {
            textEl.innerText += aboutText.charAt(i);
            i++;
        } else {
            clearInterval(aboutTypingInterval);
            if (voice) voice.pause();
        }
    }, 35); // kecepatan typing (ms)
}

// --- Fungsi Sinkronisasi User & Koin ---
function initUserSession() {
    const activeUser = sessionStorage.getItem("currentUser") || "GUEST";
    // Cari data user dari database.js (pastikan database.js sudah dipanggil di HTML)
    const userData = typeof userDatabase !== 'undefined' ? userDatabase.find(u => u.user === activeUser) : null;

    if (document.getElementById('nav-username')) {
        document.getElementById('nav-username').innerText = activeUser.toUpperCase();
    }
    if (document.getElementById('nav-coin') && userData) {
        document.getElementById('nav-coin').innerText = userData.score + " PTS";
    }
}

// --- Fungsi Render Tabel Scoreboard ---
function renderScoreboard() {
    const tbody = document.getElementById('scoreboard-body');
    if (!tbody || typeof userDatabase === 'undefined') return;

    // Urutkan skor tertinggi
    const sorted = [...userDatabase].sort((a, b) => b.score - a.score);
    
    tbody.innerHTML = sorted.map((u, i) => `
        <tr style="border-bottom: 1px solid rgba(255,0,255,0.2);">
            <td style="padding: 15px;">#${i + 1}</td>
            <td style="padding: 15px;">${u.user.toUpperCase()}</td>
            <td style="padding: 15px; color: gold;">${u.score} PTS</td>
        </tr>
    `).join('');
}


// Modifikasi fungsi changePage agar me-render scoreboard saat diklik
const originalChangePage = changePage;
changePage = function(pageId) {
    if (pageId === 'scoreboard') renderScoreboard();
    originalChangePage(pageId);
}

// Pastikan init dipanggil saat load
window.addEventListener('load', () => {
    initUserSession();
});

const canvas = document.getElementById('hacker-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*";
const drops = Array(Math.ceil(canvas.width / 14)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(12, 8, 36, 0.1)"; // Background pudar
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff00ff"; // Warna Ungu/Pink pudar
    ctx.font = "14px monospace";

    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

