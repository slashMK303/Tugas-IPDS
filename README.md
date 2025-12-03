# Aplikasi Cuaca Indonesia

Aplikasi web modern untuk menampilkan informasi cuaca real-time kota-kota di Indonesia menggunakan OpenWeatherMap API. Dibangun dengan React.js, Vite, dan Tailwind CSS v4.

## 📋 Daftar Isi

-   [Deskripsi Aplikasi](#deskripsi-aplikasi)
-   [Teknologi yang Digunakan](#teknologi-yang-digunakan)
-   [Persyaratan Sistem](#persyaratan-sistem)
-   [Cara Instalasi](#cara-instalasi)
-   [Cara Menjalankan Aplikasi](#cara-menjalankan-aplikasi)
-   [Cara Kerja Aplikasi](#cara-kerja-aplikasi)
-   [Struktur Project](#struktur-project)
-   [Fitur Aplikasi](#fitur-aplikasi)
-   [Konfigurasi Environment Variables](#konfigurasi-environment-variables)
-   [Deployment ke Vercel](#deployment-ke-vercel)
-   [API Reference](#api-reference)

---

## 🌟 Deskripsi Aplikasi

Aplikasi Cuaca Indonesia adalah single-page application (SPA) yang memungkinkan pengguna untuk mencari dan melihat informasi cuaca terkini dari berbagai kota di Indonesia. Aplikasi ini menampilkan:

-   **Suhu saat ini** dalam satuan Celsius (°C)
-   **Deskripsi cuaca** (cerah, berawan, hujan, dll) dalam Bahasa Indonesia
-   **Feels Like Temperature** - suhu yang dirasakan
-   **Kelembapan udara** dalam persentase (%)
-   **Kecepatan angin** dalam kilometer per jam (km/jam)
-   **Ikon cuaca** visual dari OpenWeatherMap

Aplikasi ini menggunakan desain dark theme modern dengan glassmorphism effect untuk tampilan yang elegant dan user-friendly.

---

## 🛠️ Teknologi yang Digunakan

### Frontend Framework & Library

1. **React.js v18.3.1**

    - Library JavaScript untuk membangun user interface
    - Menggunakan hooks (`useState`) untuk state management
    - Component-based architecture untuk reusability

2. **Vite v6.0.3**
    - Modern build tool yang sangat cepat
    - Hot Module Replacement (HMR) untuk development experience yang optimal
    - Optimized production build dengan code splitting

### Styling

3. **Tailwind CSS v4.0.0**
    - Utility-first CSS framework
    - Custom design system dengan dark theme
    - Responsive design out-of-the-box
    - @tailwindcss/vite plugin untuk integrasi seamless

### HTTP Client

4. **Axios v1.7.9**
    - Promise-based HTTP client
    - Automatic JSON data transformation
    - Error handling yang robust

### API

5. **OpenWeatherMap API**
    - RESTful API untuk data cuaca real-time
    - Endpoint: `https://api.openweathermap.org/data/2.5/weather`
    - Response dalam format JSON

---

## 💻 Persyaratan Sistem

Sebelum menjalankan aplikasi, pastikan sistem Anda memiliki:

### Software yang Diperlukan

1. **Node.js** (versi 18.x atau lebih tinggi)

    - Download dari: https://nodejs.org/
    - Verifikasi instalasi: `node --version`

2. **npm** (Node Package Manager)

    - Terinstall otomatis dengan Node.js
    - Verifikasi instalasi: `npm --version`

3. **Git** (opsional, untuk version control)

    - Download dari: https://git-scm.com/
    - Verifikasi instalasi: `git --version`

4. **Code Editor** (disarankan)
    - Visual Studio Code (https://code.visualstudio.com/)
    - Atau editor pilihan Anda

### API Key

5. **OpenWeatherMap API Key**
    - Daftar gratis di: https://openweathermap.org/api
    - Plan gratis: 1,000 API calls per hari
    - API key akan digunakan untuk autentikasi request

### Browser

6. **Modern Web Browser**
    - Google Chrome (recommended)
    - Mozilla Firefox
    - Microsoft Edge
    - Safari

---

## 📦 Cara Instalasi

### Langkah 1: Clone Repository

```bash
git clone https://github.com/slashMK303/Tugas-IPDS.git
cd Tugas-IPDS
```

Atau download ZIP dari GitHub dan extract ke folder pilihan Anda.

### Langkah 2: Install Dependencies

Jalankan perintah berikut untuk menginstall semua package yang diperlukan:

```bash
npm install
```

Proses ini akan menginstall:

-   react & react-dom
-   vite
-   tailwindcss & @tailwindcss/vite
-   axios
-   eslint & eslint-plugin-react
-   Dan semua dependencies lainnya yang tercantum di `package.json`

**Estimasi waktu**: 1-3 menit tergantung koneksi internet

### Langkah 3: Konfigurasi Environment Variables (Opsional)

Untuk keamanan yang lebih baik, buat file `.env` di root directory:

```bash
# Buat file .env
echo VITE_API_KEY=your_api_key_here > .env
```

Ganti `your_api_key_here` dengan API key Anda dari OpenWeatherMap.

**Catatan**: Jika tidak membuat file `.env`, API key yang sudah ada di `App.jsx` akan tetap berfungsi untuk development.

---

## 🚀 Cara Menjalankan Aplikasi

### Mode Development

Jalankan development server dengan perintah:

```bash
npm run dev
```

Output yang akan muncul:

```
  VITE v6.0.3  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Akses aplikasi**:

1. Buka browser
2. Kunjungi: `http://localhost:5173/`
3. Aplikasi sudah siap digunakan

**Fitur Development Mode**:

-   Hot Module Replacement (HMR) - perubahan code langsung terlihat tanpa refresh
-   Fast refresh - React component update instan
-   Error overlay - error ditampilkan langsung di browser

### Mode Production (Build)

Untuk membuat production build:

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`:

-   HTML, CSS, dan JavaScript yang sudah di-minify
-   Assets yang sudah di-optimize
-   Ready untuk deployment

### Preview Production Build

Test production build secara lokal:

```bash
npm run preview
```

Aplikasi akan berjalan di `http://localhost:4173/`

---

## ⚙️ Cara Kerja Aplikasi

### Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  (Browser - React Components dengan Tailwind CSS styling)  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ User Input (Nama Kota)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      React State Management                  │
│  - useState untuk location, data, error                     │
│  - Event handlers (handleKeyDown, fetchWeather)             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Axios HTTP Request
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    OpenWeatherMap API                        │
│  GET /data/2.5/weather?q={city},ID&units=metric&appid=...  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ JSON Response
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Processing                         │
│  - Parse JSON response                                       │
│  - Convert wind speed (m/s to km/h)                         │
│  - Update React state                                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Re-render
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Display Results                          │
│  - Weather card dengan temperature                          │
│  - Stats cards (feels like, humidity, wind)                 │
│  - Weather icon                                              │
└─────────────────────────────────────────────────────────────┘
```

### Flow Diagram Detail

#### 1. **Inisialisasi Aplikasi**

```javascript
// App.jsx dimuat
function App() {
    // State initialization
    const [data, setData] = useState({}); // Menyimpan data cuaca
    const [location, setLocation] = useState(""); // Menyimpan input user
    const [error, setError] = useState(""); // Menyimpan pesan error

    // API configuration
    const apiKey = "f68a5ee6d691a3a3134a00809f4a0c9e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},ID&units=metric&appid=${apiKey}&lang=id`;
}
```

**Penjelasan**:

-   `useState` adalah React Hook untuk membuat state yang reactive
-   Ketika state berubah, component akan re-render otomatis
-   URL API dibuat dynamic dengan template literal

#### 2. **User Interaction Flow**

```
User mengetik nama kota di input field
            ↓
onChange event triggered
            ↓
setLocation(event.target.value) dipanggil
            ↓
State location ter-update
            ↓
Component re-render (input value ter-update)
```

#### 3. **Search Weather Flow**

**Opsi A: Tekan Enter**

```javascript
const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        fetchWeather(); // Panggil fungsi fetch
    }
};
```

**Opsi B: Klik Button**

```javascript
<button onClick={fetchWeather} disabled={!location}>
    {/* Search icon */}
</button>
```

#### 4. **API Request Process**

```javascript
const fetchWeather = () => {
    // Validasi input tidak kosong
    if (!location) return;

    // Kirim HTTP GET request menggunakan Axios
    axios
        .get(url)
        .then((response) => {
            // Success: simpan data ke state
            setData(response.data);
            setError("");
        })
        .catch(() => {
            // Error: tampilkan pesan error
            setError("Kota tidak ditemukan atau kesalahan jaringan.");
            setData({});
        })
        .finally(() => {
            // Selalu dijalankan: clear input field
            setLocation("");
        });
};
```

**Proses Detail**:

1. **Validation**: Check apakah input tidak kosong
2. **HTTP Request**: Axios mengirim GET request ke OpenWeatherMap API
3. **Request Headers**:
    ```
    GET https://api.openweathermap.org/data/2.5/weather?q=Surabaya,ID&units=metric&appid=xxx&lang=id
    Accept: application/json
    ```
4. **API Response**: Server mengembalikan JSON data
5. **Success Handling**: Data disimpan ke state `data`
6. **Error Handling**: Jika error (404, network error, dll), tampilkan pesan
7. **Cleanup**: Input field di-clear

#### 5. **Data Structure dari API**

Contoh response JSON dari OpenWeatherMap:

```json
{
    "coord": {
        "lon": 112.7508,
        "lat": -7.2575
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "awan pecah",
            "icon": "04d"
        }
    ],
    "main": {
        "temp": 32.5,
        "feels_like": 36.8,
        "humidity": 65
    },
    "wind": {
        "speed": 3.5
    },
    "name": "Surabaya"
}
```

#### 6. **Data Processing & Display**

```javascript
// Konversi kecepatan angin dari m/s ke km/jam
const windSpeedKmh = data.wind?.speed ? data.wind.speed * 3.6 : 0;

// Display di UI
<h2>{data.main?.temp?.toFixed(1)}°C</h2>
<p>{data.weather[0]?.description}</p>
<p>{data.main?.feels_like?.toFixed(1)}°C</p>
<p>{data.main?.humidity}%</p>
<p>{windSpeedKmh.toFixed(1)} km/jam</p>
```

**Optional Chaining (`?.`)**:

-   Mencegah error jika property tidak ada
-   Contoh: `data.main?.temp` akan return `undefined` jika `main` null

#### 7. **Conditional Rendering**

```javascript
{
    data.name !== undefined && (
        <div className="weather-results">{/* Tampilkan hasil cuaca */}</div>
    );
}

{
    error && <p className="error-message">{error}</p>;
}
```

**Penjelasan**:

-   Weather card hanya muncul jika `data.name` ada (ada hasil dari API)
-   Error message hanya muncul jika `error` state tidak kosong

---

## 📁 Struktur Project

```
Tugas-IPDS/
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg         # React logo
│   ├── App.jsx               # Main component aplikasi
│   ├── App.css               # CSS untuk App component (optional)
│   ├── main.jsx              # Entry point aplikasi
│   └── index.css             # Global styles & Tailwind directives
├── .gitignore                # File yang diabaikan Git
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── package-lock.json         # Lock file untuk dependencies
├── README.md                 # Dokumentasi (file ini)
└── vite.config.js            # Vite configuration
```

### Penjelasan File Penting

#### `package.json`

Berisi metadata project dan dependencies:

```json
{
    "name": "cuaca",
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite", // Development server
        "build": "vite build", // Production build
        "preview": "vite preview" // Preview production build
    },
    "dependencies": {
        "axios": "^1.7.9", // HTTP client
        "react": "^18.3.1", // React library
        "react-dom": "^18.3.1" // React DOM renderer
    },
    "devDependencies": {
        "@tailwindcss/vite": "^4.0.0-beta.7",
        "tailwindcss": "^4.0.0-beta.7",
        "vite": "^6.0.3"
    }
}
```

#### `vite.config.js`

Konfigurasi Vite build tool:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
});
```

#### `src/main.jsx`

Entry point yang mount React app:

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

#### `src/index.css`

Tailwind CSS directives dan global styles:

```css
@import "tailwindcss";
```

#### `index.html`

HTML template dengan mounting point:

```html
<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cuaca Indonesia</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
    </body>
</html>
```

---

## ✨ Fitur Aplikasi

### 1. **Real-time Weather Search**

-   Input field untuk nama kota
-   Search dengan menekan Enter atau klik button
-   Icon search yang intuitif

### 2. **Comprehensive Weather Data**

-   **Temperature**: Suhu aktual dalam °C
-   **Feels Like**: Suhu yang terasa (heat index)
-   **Description**: Deskripsi cuaca dalam Bahasa Indonesia
-   **Humidity**: Kelembapan udara (%)
-   **Wind Speed**: Kecepatan angin (km/jam)
-   **Weather Icon**: Visual representation dari kondisi cuaca

### 3. **User-Friendly Interface**

-   **Dark Theme**: Elegant dan nyaman di mata
-   **Glassmorphism Effect**: Modern card design dengan backdrop blur
-   **Responsive Design**: Optimal di desktop, tablet, dan mobile
-   **Smooth Transitions**: Hover effects dan focus states
-   **Accessible**: ARIA labels dan semantic HTML

### 4. **Error Handling**

-   Validasi input kosong (button disabled)
-   Error message jika kota tidak ditemukan
-   Network error handling
-   Graceful degradation

### 5. **Performance Optimization**

-   Fast initial load dengan Vite
-   Code splitting untuk optimal bundle size
-   Lazy loading untuk images
-   Efficient re-renders dengan React

---

## 🔐 Konfigurasi Environment Variables

### Untuk Development Lokal

1. **Buat file `.env` di root project**:

```bash
VITE_API_KEY=your_openweathermap_api_key_here
```

2. **Update `src/App.jsx`**:

```javascript
const apiKey =
    import.meta.env.VITE_API_KEY || "f68a5ee6d691a3a3134a00809f4a0c9e";
```

3. **Pastikan `.env` ada di `.gitignore`**:

```gitignore
# Environment variables
.env
.env.local
.env*.local
```

### Keamanan API Key

⚠️ **Penting untuk Production**:

-   Jangan commit API key ke Git
-   Gunakan environment variables di hosting platform
-   Pertimbangkan membuat backend proxy untuk hide API key
-   Aktifkan domain restrictions di OpenWeatherMap dashboard

---

## 🚀 Deployment ke Vercel

### Langkah 1: Persiapan

1. **Push code ke GitHub** (sudah dilakukan)
2. **Pastikan `.env` ada di `.gitignore`**
3. **Test production build lokal**:

```bash
npm run build
npm run preview
```

### Langkah 2: Deploy ke Vercel

#### Opsi A: Vercel Dashboard (Recommended)

1. **Login ke Vercel**

    - Kunjungi: https://vercel.com
    - Login dengan GitHub account

2. **Import Project**

    - Klik "Add New..." → "Project"
    - Select repository: `slashMK303/Tugas-IPDS`
    - Klik "Import"

3. **Configure Project**

    - Framework Preset: **Vite**
    - Root Directory: `./` (default)
    - Build Command: `npm run build` (auto-detected)
    - Output Directory: `dist` (auto-detected)

4. **Environment Variables**

    - Klik "Environment Variables"
    - Add variable:
        - **Name**: `VITE_API_KEY`
        - **Value**: `your_openweathermap_api_key`
        - Environment: **Production**, **Preview**, **Development**

5. **Deploy**
    - Klik "Deploy"
    - Wait 1-2 menit
    - Aplikasi akan live di: `https://your-project.vercel.app`

#### Opsi B: Vercel CLI

1. **Install Vercel CLI**:

```bash
npm i -g vercel
```

2. **Login**:

```bash
vercel login
```

3. **Deploy**:

```bash
vercel
```

4. **Set Environment Variable**:

```bash
vercel env add VITE_API_KEY
```

Masukkan API key Anda.

5. **Deploy to Production**:

```bash
vercel --prod
```

### Langkah 3: Custom Domain (Opsional)

1. Buka Project Settings di Vercel
2. Go to "Domains"
3. Add custom domain Anda
4. Configure DNS records sesuai instruksi

### Continuous Deployment

Setiap push ke branch `main`/`master` akan otomatis trigger deployment baru di Vercel.

---

## 📚 API Reference

### OpenWeatherMap Current Weather API

**Base URL**: `https://api.openweathermap.org/data/2.5/weather`

**Method**: `GET`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Nama kota dan country code (e.g., "Surabaya,ID") |
| `appid` | string | Yes | Your OpenWeatherMap API key |
| `units` | string | No | Units of measurement ("metric", "imperial", "standard") |
| `lang` | string | No | Language code (e.g., "id" untuk Bahasa Indonesia) |

**Example Request**:

```
GET https://api.openweathermap.org/data/2.5/weather?q=Jakarta,ID&units=metric&appid=YOUR_API_KEY&lang=id
```

**Example Response**:

```json
{
    "coord": { "lon": 106.8451, "lat": -6.2146 },
    "weather": [
        {
            "id": 802,
            "main": "Clouds",
            "description": "awan tersebar",
            "icon": "03d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 31.06,
        "feels_like": 35.34,
        "temp_min": 30.01,
        "temp_max": 32.03,
        "pressure": 1009,
        "humidity": 66
    },
    "visibility": 9000,
    "wind": {
        "speed": 5.66,
        "deg": 120
    },
    "clouds": { "all": 40 },
    "dt": 1638360847,
    "sys": {
        "type": 1,
        "id": 9226,
        "country": "ID",
        "sunrise": 1638311682,
        "sunset": 1638356172
    },
    "timezone": 25200,
    "id": 1642911,
    "name": "Jakarta",
    "cod": 200
}
```

**Response Fields yang Digunakan**:

-   `name`: Nama kota
-   `weather[0].description`: Deskripsi cuaca
-   `weather[0].icon`: Icon code
-   `main.temp`: Suhu saat ini (°C)
-   `main.feels_like`: Suhu yang terasa (°C)
-   `main.humidity`: Kelembapan (%)
-   `wind.speed`: Kecepatan angin (m/s, dikonversi ke km/jam)

**Error Codes**:
| Code | Message | Description |
|------|---------|-------------|
| 404 | City not found | Kota tidak ditemukan |
| 401 | Invalid API key | API key salah atau tidak valid |
| 429 | Too many requests | Melebihi rate limit |

**Rate Limits** (Free Plan):

-   1,000 API calls per hari
-   60 calls per menit

---

## 🎨 Styling & Design System

### Color Palette

```css
/* Background Gradient */
from-slate-950 → via-slate-900 → to-slate-800

/* Cards */
bg-slate-900/60 (with 60% opacity)
border-white/10

/* Text */
text-white (primary)
text-white/60 (secondary)

/* Accent */
bg-sky-600 (buttons)
hover:bg-sky-500
focus:ring-sky-400

/* Error */
bg-red-500/15
text-red-200
border-red-500/30
```

### Typography Scale

```css
/* Headings */
text-3xl (Title)
text-6xl (Temperature)
text-xl (Location, Stats)

/* Body */
text-sm (Descriptions)
text-xs (Labels)

/* Font Weight */
font-semibold (Headings)
font-medium (Subheadings)
```

### Spacing System

```css
/* Padding */
p-6 (Container)
p-4 (Cards)
px-4 py-2.5 (Input, Button)

/* Gaps */
gap-3 (Form elements)
gap-4 (Stats grid)
gap-6 (Main sections)

/* Margin */
mb-6 (Header)
mt-5 (Temperature)
mt-8 (Results)
```

### Border Radius

```css
rounded-xl (Input, Button)
rounded-2xl (Cards)
```

---

## 🐛 Troubleshooting

### Problem: Module not found errors

**Solution**:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Port 5173 already in use

**Solution**:

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill
```

Atau ubah port di `vite.config.js`:

```javascript
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
    },
});
```

### Problem: API key tidak bekerja

**Checklist**:

-   ✅ API key sudah aktif (cek email konfirmasi dari OpenWeatherMap)
-   ✅ Format URL sudah benar
-   ✅ Tidak ada typo di API key
-   ✅ API key belum kadaluarsa

### Problem: Tailwind classes tidak working

**Solution**:

```bash
# Reinstall Tailwind
npm uninstall tailwindcss @tailwindcss/vite
npm install -D tailwindcss@4.0.0-beta.7 @tailwindcss/vite@4.0.0-beta.7
```

Pastikan `index.css` berisi:

```css
@import "tailwindcss";
```

---

## 📝 Catatan Pengembangan

### Best Practices yang Diimplementasikan

1. **Component Structure**: Single component dengan clear separation of concerns
2. **State Management**: Minimal state dengan useState hooks
3. **Error Handling**: Comprehensive try-catch dan user feedback
4. **Code Quality**: ESLint untuk maintain code standards
5. **Performance**: Lazy evaluation dengan optional chaining
6. **Accessibility**: Semantic HTML dan ARIA labels
7. **Security**: Environment variables untuk sensitive data
8. **Version Control**: Git dengan proper .gitignore

### Possible Improvements

1. **Loading States**: Tambahkan spinner saat fetching data
2. **Weather History**: Simpan history pencarian di localStorage
3. **Location Detection**: Auto-detect user location dengan Geolocation API
4. **Multi-language**: Tambahkan language switcher
5. **Dark/Light Mode**: Toggle theme preference
6. **Charts**: Visualisasi data cuaca dengan charts library
7. **PWA**: Convert ke Progressive Web App untuk offline support
8. **Backend Proxy**: API key hiding dengan serverless functions

---

## 📞 Kontak & Support

**Developer**: slashMK303  
**Repository**: https://github.com/slashMK303/Tugas-IPDS  
**API Documentation**: https://openweathermap.org/current

---

## 📄 Lisensi

Project ini dibuat untuk keperluan **Laporan Akhir Infrastruktur dan Platform Sains Data**.

---

**Last Updated**: December 3, 2025  
**Version**: 1.0.0
