# 🍽️ RESTO SCAN - Aplikasi Pemesanan Restoran dengan QR Code

Sistem pemesanan restoran modern yang memungkinkan pelanggan scan QR code di meja, lihat menu digital, pesan makanan, dan kasir bisa manage pesanan secara real-time.

---

## 📋 RINGKASAN PROJECT

### **Apa itu Resto Scan?**
Aplikasi web full-stack untuk restoran dengan fitur:
- 📱 Pelanggan scan QR → input data → lihat menu → pesan makanan
- 👨‍💼 Kasir manage semua pesanan → update status (pending → diproses → siap → selesai)
- 🔄 Real-time sync antara pelanggan dan kasir
- 🔐 Password protection untuk dashboard kasir

---

## 🏗️ TECH STACK

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js + Express.js |
| **Database** | Supabase (PostgreSQL) |
| **Frontend** | HTML + CSS + Vanilla JavaScript |
| **Deployment** | Railway (Backend) + Vercel (Frontend) |

---

## 📁 STRUKTUR PROJECT

```
resto-scan/
├── .env                          # Environment variables (Supabase key)
├── server.js                     # Backend utama ⚠️ JANGAN DIUBAH LOGIC
├── package.json                  # Dependencies
├── public/                       # Frontend static files
│   ├── index.html               # Halaman login (input nama & meja)
│   ├── menu.html                # Halaman menu & keranjang
│   ├── status.html              # Halaman cek status pesanan (real-time)
│   ├── kasir.html               # Dashboard kasir (dengan password)
│   ├── style.css                # CSS semua halaman (BOLEH DIPOLISH)
│   └── README.md                # Dokumentasi ini
└── .git/                         # GitHub repo
```

---

## 🔄 ALUR DEVELOPMENT - TAHAP DEMI TAHAP

### **TAHAP 0: Database Setup** ✅ DONE
**Apa yang dilakukan:**
- Buat akun Supabase
- Create 3 tabel di Supabase (PostgreSQL):
  - `menus` - daftar menu makanan
  - `orders` - pesanan dari pelanggan
  - `order_items` - detail item per pesanan

**SQL yang dijalankan:**
```sql
CREATE TABLE menus (id UUID PRIMARY KEY, name TEXT, category TEXT, price INTEGER, description TEXT, image_url TEXT, created_at TIMESTAMP);
CREATE TABLE orders (id UUID PRIMARY KEY, table_number INTEGER, customer_name TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMP, updated_at TIMESTAMP);
CREATE TABLE order_items (id UUID PRIMARY KEY, order_id UUID REFERENCES orders(id), menu_id UUID REFERENCES menus(id), quantity INTEGER, notes TEXT, created_at TIMESTAMP);
```

**Status:** ✅ Database sudah live di Supabase dengan 5 sample menu

---

### **TAHAP 1: Backend Setup** ✅ DONE
**Apa yang dilakukan:**
- Setup Node.js project dengan Express.js
- Install dependencies: `express`, `@supabase/supabase-js`, `cors`, `dotenv`
- Buat `server.js` dengan 5 endpoint:

**Endpoints yang sudah dibuat:**
1. `GET /` - Test endpoint
2. `GET /api/menus` - Ambil semua menu
3. `POST /api/orders` - Buat pesanan baru
4. `GET /api/orders/:id` - Detail pesanan
5. `GET /api/orders/:id/items` - Detail item pesanan
6. `GET /api/orders` - Ambil semua pesanan (untuk kasir)
7. `PATCH /api/orders/:id` - Update status pesanan

**⚠️ JANGAN DIUBAH:**
- Logic di `server.js` (validasi, Supabase query)
- Endpoint path & method (GET, POST, PATCH)
- Response format JSON

**Status:** ✅ Backend live di Railway (resto-scan-production.up.railway.app)

---

### **TAHAP 2: Frontend Customer - Menu Page** ✅ DONE
**File:** `public/index.html` + `public/menu.html`

**Fitur:**
1. **index.html** - Landing page
   - Input nama pelanggan
   - Input nomor meja (atau auto-fill dari URL param `?table=5`)
   - Submit → save ke sessionStorage → redirect ke menu.html

2. **menu.html** - Menu & Keranjang
   - Fetch semua menu dari API `/api/menus`
   - Tampilkan dalam grid dengan foto, nama, harga
   - Tombol "+ Tambah" ke keranjang
   - Keranjang di fixed bottom dengan qty +/- buttons
   - Data keranjang disimpan di sessionStorage

**⚠️ JANGAN DIUBAH:**
- sessionStorage key: `customerName`, `tableNumber`, `cart`
- Fetch endpoint path: `/api/menus`, `/api/orders`
- HTML structure untuk form input (biar backend bisa parse)
- Button click handlers untuk tambah/kurang qty

**BOLEH DIPOLISH (Design):**
- Warna, font, spacing, layout grid
- Shadow, border-radius
- Hover effects
- Responsive breakpoints

**Status:** ✅ Halaman menu sudah jalan, keranjang responsive

---

### **TAHAP 3: Frontend Customer - Status Page** ✅ DONE
**File:** `public/status.html`

**Fitur:**
1. Terima `order_id` dari URL param: `?order_id=xxx`
2. Polling otomatis setiap 5 detik ke `/api/orders/:id`
3. Tampilkan detail pesanan:
   - Nama pelanggan, nomor meja, order ID
   - Status real-time (⏳ Pending → 👨‍🍳 Diproses → ✅ Siap → 🎉 Selesai)
   - List item pesanan + qty
4. Live update saat kasir ubah status

**⚠️ JANGAN DIUBAH:**
- Polling interval (5 detik)
- Fetch endpoint: `/api/orders/:id`, `/api/orders/:id/items`
- Status values: 'pending', 'diproses', 'siap', 'selesai'

**BOLEH DIPOLISH:**
- Status badge colors & styling
- Card design
- Typography

**Status:** ✅ Real-time polling sudah tested, live-update jalan

---

### **TAHAP 4: Frontend Kasir - Dashboard** ✅ DONE
**File:** `public/kasir.html`

**Fitur:**
1. **Login Screen** - Password protect
   - Input password (default: `resto123`)
   - Error message jika salah
   - Simpan session di sessionStorage

2. **Dashboard** - Manage pesanan
   - Polling setiap 15 detik ke `/api/orders`
   - Tampilkan semua pesanan dalam card grid
   - Setiap card ada tombol status: Pending, Masak, Siap, Selesai
   - Statistics box: Menunggu, Diproses, Siap (auto-count)
   - Logout button

3. **Real-time Update** - Klik tombol status → langsung update di DB → pelanggan lihat

**⚠️ JANGAN DIUBAH:**
- Password logic (sessionStorage check)
- Polling interval (15 detik)
- Fetch endpoint: `/api/orders`, `/api/orders/:id`
- Status button logic
- PATCH request format

**BOLEH DIPOLISH:**
- Password screen design
- Card styling
- Button styling
- Stats box design
- Color scheme untuk status badge

**Password Default:** `resto123` (bisa diganti di kode)

**Status:** ✅ Login + dashboard sudah jalan, password-protect aktif

---

### **TAHAP 5: Styling & CSS** ✅ DONE
**File:** `public/style.css`

**Fitur CSS yang sudah ada:**
- Gradient background (biru-ungu)
- Card design dengan shadow
- Button styling (primary, secondary, add)
- Form styling dengan focus state
- Grid layout untuk menu (responsive)
- Fixed cart container di bottom
- Status badge colors
- Mobile responsive (breakpoint 768px)

**⚠️ JANGAN DIUBAH:**
- CSS class names (dipakai di HTML)
- Media query breakpoint 768px (mobile responsive)
- Grid column definitions untuk menu layout
- Fixed positioning untuk cart

**BOLEH DIPOLISH:**
- Warna (gradients, backgrounds)
- Font family (bisa ganti ke Google Fonts)
- Spacing/padding/margin
- Border-radius values
- Shadow blur & spread
- Hover animations
- Transition timing
- Typography (font-size, font-weight)

**Status:** ✅ CSS sudah ada & responsive, siap di-polish

---

### **TAHAP 6: Environment & Deployment Config** ✅ DONE

**`.env` file (Jangan push ke GitHub):**
```env
SUPABASE_URL=https://audvlqjthhckedwbai.supabase.co
SUPABASE_ANON_KEY=[COPY DARI SUPABASE]
PORT=3000
```

**⚠️ JANGAN DIUBAH:**
- Environment variable names (SUPABASE_URL, SUPABASE_ANON_KEY)
- PORT value (3000 di local, Railway auto-assign)

**⚠️ CRITICAL - API_BASE_URL di HTML files:**
Setiap fetch di menu.html, status.html, kasir.html harus pakai:
```javascript
const API_BASE_URL = 'https://resto-scan-production.up.railway.app';
```

**Status:** ✅ Environment variables sudah setup di Railway

---

## 🌐 DEPLOYMENT STATUS

### **Backend - Railway** ✅ LIVE
- **URL:** `https://resto-scan-production.up.railway.app`
- **Branch:** main (auto-deploy)
- **Environment Variables:** Sudah set di Railway dashboard

**Test Backend:**
```bash
curl https://resto-scan-production.up.railway.app/api/menus
```

### **Frontend - Vercel** ⏳ SIAP DEPLOY
- **Steps:**
  1. Pastikan semua API URL sudah update ke Railway
  2. Push ke GitHub: `git add . && git commit -m "msg" && git push`
  3. Buka https://vercel.com → Import `resto-scan` repo
  4. Set Root Directory: `public`
  5. Deploy
  6. Dapat URL: `https://resto-scan-xxx.vercel.app`

---

## 🎨 DESIGN POLISH CHECKLIST

Sebelum final deploy, kamu bisa polish ini **TANPA mengubah logic:**

### **Priority 1 (Must-have):**
- [ ] Update color scheme (gradient, backgrounds)
- [ ] Improve typography (font, size, weight)
- [ ] Enhance card shadows & borders
- [ ] Better button hover states
- [ ] Status badge styling improvements

### **Priority 2 (Nice-to-have):**
- [ ] Add animations/transitions
- [ ] Improve spacing consistency
- [ ] Better mobile padding
- [ ] Icon improvements
- [ ] Loading states

### **Priority 3 (Extra):**
- [ ] Dark mode support
- [ ] Custom fonts from Google Fonts
- [ ] Advanced CSS animations
- [ ] Better form validations UI

---

## 🔐 SECURITY & PASSWORD

**Kasir Dashboard Password:**
- **Default:** `resto123`
- **Location:** `public/kasir.html` line ~180
  ```javascript
  const KASIR_PASSWORD = 'resto123';
  ```
- **Change:** Edit baris di atas dengan password baru sebelum production

**Security Notes:**
- Password tersimpan di frontend (acceptable untuk skala kecil)
- Untuk production: tambah backend authentication (JWT)
- Supabase key adalah PUBLIC key (aman, hanya buat read menu & submit order)

---

## 📊 DATABASE SCHEMA

### **Tabel: menus**
```
id (UUID) - Primary Key
name (TEXT) - Nama menu
category (TEXT) - Kategori (Nasi, Mie, Sup, dll)
price (INTEGER) - Harga dalam Rupiah
description (TEXT) - Deskripsi menu
image_url (TEXT) - Link foto menu
created_at (TIMESTAMP) - Waktu dibuat
```

### **Tabel: orders**
```
id (UUID) - Primary Key
table_number (INTEGER) - Nomor meja
customer_name (TEXT) - Nama pelanggan
status (TEXT) - Status pesanan [pending, diproses, siap, selesai]
created_at (TIMESTAMP) - Waktu pesanan dibuat
updated_at (TIMESTAMP) - Waktu status terakhir diupdate
```

### **Tabel: order_items**
```
id (UUID) - Primary Key
order_id (UUID) - Foreign Key ke orders
menu_id (UUID) - Foreign Key ke menus
quantity (INTEGER) - Jumlah porsi
notes (TEXT) - Catatan khusus (pedas, tanpa telur, dll)
created_at (TIMESTAMP) - Waktu item ditambah
```

---

## 🔗 ALUR DATA

```
PELANGGAN FLOW:
1. Buka: https://resto-scan.vercel.app?table=5
2. Input nama → sessionStorage
3. Fetch /api/menus → display menu
4. Click "+ Tambah" → add to sessionStorage cart
5. Click "Pesan Sekarang" → POST /api/orders
6. Server buat order + order_items di database
7. Redirect ke status.html?order_id=xxx
8. Polling /api/orders/:id setiap 5 detik
9. Lihat status update real-time saat kasir ubah

KASIR FLOW:
1. Buka: https://resto-scan.vercel.app/kasir.html
2. Input password → check sessionStorage
3. Polling /api/orders setiap 15 detik
4. Click tombol status (Masak, Siap, Selesai)
5. PATCH /api/orders/:id {status: "diproses"}
6. Database update
7. Pelanggan lihat status berubah dalam 5 detik
```

---

## 📱 URLS PENTING

**Setelah Deploy ke Vercel (ganti `xxx` dengan domain Vercel kamu):**

| Page | URL | Akses |
|------|-----|-------|
| Menu (Pelanggan) | `https://resto-scan-xxx.vercel.app` | Semua orang |
| Menu Meja 1 | `https://resto-scan-xxx.vercel.app?table=1` | Via QR code |
| Menu Meja 2 | `https://resto-scan-xxx.vercel.app?table=2` | Via QR code |
| Kasir Dashboard | `https://resto-scan-xxx.vercel.app/kasir.html` | Butuh password |
| Status Pesanan | `https://resto-scan-xxx.vercel.app/status.html?order_id=xxx` | Auto dari menu |

---

## 🚀 QR CODE GENERATION

Setelah frontend live di Vercel, buat QR code untuk setiap meja:

**Tools:** https://qr-code-generator.com

**Buat QR untuk:**
```
Meja 1: https://resto-scan-xxx.vercel.app?table=1
Meja 2: https://resto-scan-xxx.vercel.app?table=2
Meja 3: https://resto-scan-xxx.vercel.app?table=3
Meja 4: https://resto-scan-xxx.vercel.app?table=4
Meja 5: https://resto-scan-xxx.vercel.app?table=5
```

**Print & tempel di meja-meja! 🎉**

---

## 📝 TESTING CHECKLIST

Sebelum production launch:

- [ ] **Backend test:**
  - [ ] GET /api/menus berhasil
  - [ ] POST /api/orders berhasil buat order
  - [ ] GET /api/orders/:id berhasil ambil detail
  - [ ] PATCH /api/orders/:id update status

- [ ] **Frontend customer:**
  - [ ] Input nama & meja bisa submit
  - [ ] Menu load dari API
  - [ ] Tambah/kurang qty keranjang jalan
  - [ ] Checkout submit pesanan ke server
  - [ ] Status page polling live-update

- [ ] **Frontend kasir:**
  - [ ] Login screen muncul
  - [ ] Password `resto123` berfungsi
  - [ ] Dashboard load semua pesanan
  - [ ] Tombol status update langsung di DB
  - [ ] Pelanggan lihat perubahan status dalam 5 detik
  - [ ] Logout berfungsi

- [ ] **Mobile responsive:**
  - [ ] Menu page responsive di HP
  - [ ] Kasir dashboard responsive (minimal tablet)
  - [ ] Semua tombol clickable

---

## 🛠️ TROUBLESHOOTING

### **Problem: API call gagal (404/CORS error)**
- [ ] Pastikan API_BASE_URL sudah benar di HTML
- [ ] Pastikan Railway backend masih Online di dashboard

### **Problem: Password kasir tidak bekerja**
- [ ] Clear browser sessionStorage: `sessionStorage.clear()`
- [ ] Cek password di kasir.html line ~180

### **Problem: Status tidak update real-time**
- [ ] Cek polling interval di status.html (harus 5000ms = 5 detik)
- [ ] Cek browser console untuk error messages

### **Problem: Menu tidak load**
- [ ] Cek Supabase connection di backend
- [ ] Cek API_BASE_URL di menu.html

---

## 📚 FILE YANG PENTING (JANGAN LUPA)**

**Production critical files:**
- `server.js` - Backend logic (BACKUP!)
- `public/index.html` - Entry point
- `public/menu.html` - Main customer page
- `public/kasir.html` - Kasir dashboard
- `.env` - Environment variables (JANGAN push ke GitHub)
- `package.json` - Dependencies

**Optional backup:**
```bash
git tag -a v1.0-launch -m "Production launch version"
git push origin v1.0-launch
```

---

## 🎓 NEXT STEPS IMPROVEMENT

Setelah launch, fitur yang bisa ditambah:

1. **User Authentication** - Login untuk pelanggan & kasir
2. **Payment Integration** - Integrasi Midtrans/GoPay
3. **Receipt Printing** - Thermal printer untuk struk
4. **Analytics Dashboard** - Laporan penjualan harian
5. **Menu Management** - Admin bisa edit menu via web
6. **Photo Upload** - Admin upload foto menu
7. **Notes/Special Request** - Pelanggan bisa add notes
8. **Table Management** - Admin set berapa meja
9. **Email Notification** - Notify pelanggan saat pesanan siap
10. **Mobile App** - Native iOS/Android version

---

## 📞 SUMMARY

**Apa yang sudah selesai:**
- ✅ Database Supabase dengan 3 tabel & 5 sample menu
- ✅ Backend Express dengan 7 endpoints
- ✅ Frontend customer (menu + status real-time)
- ✅ Frontend kasir (dashboard + password)
- ✅ Backend deployed ke Railway (LIVE)
- ✅ Styling CSS responsive & siap di-polish

**Apa yang tinggal:**
- ⏳ Polish design (colors, fonts, spacing)
- ⏳ Deploy frontend ke Vercel
- ⏳ Generate QR codes
- ⏳ Test all flows di production

**Waktu estimasi:**
- Design polish: 1-2 jam
- Frontend deploy: 5 menit
- QR generation: 10 menit
- Total: ~2-3 jam selesai! 🚀

---

**Good luck! Kamu udah bikin aplikasi full-stack yang lengkap! 🎉**

*Last updated: May 17, 2026*