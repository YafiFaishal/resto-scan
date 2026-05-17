---
name: RestoScan
version: alpha
description: >
  Visual identity untuk aplikasi pemesanan restoran modern berbasis QR Code.
  Hangat, premium, dan mudah dibaca — baik di layar HP dalam suasana restoran
  yang temaram maupun di layar kasir yang terang.

colors:
  primary: "#1C1410"
  secondary: "#7C6A58"
  tertiary: "#C8823A"
  tertiary-container: "#E8A55A"
  on-tertiary: "#FFFFFF"
  neutral: "#FAF7F2"
  neutral-variant: "#F0EBE3"
  surface: "#FFFFFF"
  surface-dim: "#EDE8E2"
  error: "#BA1A1A"
  success: "#2D6A4F"
  warning: "#E07B39"
  pending: "#8B7355"

typography:
  h1:
    fontFamily: Playfair Display
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  h2:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.3
  h3:
    fontFamily: Playfair Display
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: DM Sans
    fontSize: 0.9rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: DM Sans
    fontSize: 0.8rem
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: DM Sans
    fontSize: 0.7rem
    fontWeight: 600
    letterSpacing: 0.12em
  price:
    fontFamily: DM Sans
    fontSize: 1.05rem
    fontWeight: 700
    letterSpacing: -0.01em
  menu-name:
    fontFamily: Playfair Display
    fontSize: 1.1rem
    fontWeight: 600

rounded:
  xs: 4px
  sm: 8px
  md: 14px
  lg: 20px
  xl: 28px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px

components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.full}"
    padding: 14px 28px
    typography: "{typography.label-caps}"
  button-primary-hover:
    backgroundColor: "{colors.tertiary-container}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    padding: 12px 24px
  button-ghost:
    backgroundColor: "{colors.neutral-variant}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 10px 20px
  card-menu:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 0
  badge-pending:
    backgroundColor: "#F5EFE6"
    textColor: "{colors.pending}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  badge-diproses:
    backgroundColor: "#FFF4E6"
    textColor: "{colors.warning}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  badge-siap:
    backgroundColor: "#E6F4EC"
    textColor: "{colors.success}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  badge-selesai:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  cart-bar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.xl}"
    padding: 16px 20px
  input:
    backgroundColor: "{colors.neutral-variant}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 14px 16px
  nav-bottom:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl} {rounded.xl} 0 0"
---

## Overview

**Warm Artisan Bistro** — RestoScan mengadopsi estetika restoran artisan premium:
hangat, jujur, dan menggugah selera. Desain terinspirasi dari menu cetak
berbahan linen, neon warm-white di dapur terbuka, dan plating yang rapi.

Tiga kata kunci yang harus selalu terasa: **Hangat. Bersih. Mengundang.**

Interface dirancang untuk *dua konteks utama*:
- **Pelanggan di meja** — sering di kondisi remang, pakai HP, perlu cepat
  dan intuitif. Kontras harus tinggi, teks mudah terbaca, CTA jelas.
- **Kasir di counter** — butuh informasi padat dan efisien, update status
  dalam sekejap tanpa kebingungan.

---

## Colors

Palet mengacu pada material natural — tembaga, kayu gelap, linen krem, dan
hijau daun — bukan biru-ungu generik SaaS.

- **Primary (#1C1410):** Espresso dark — untuk headline, teks utama, dan
  elemen navbar. Menggantikan hitam murni agar tetap terasa hangat.
- **Secondary (#7C6A58):** Walnut — untuk teks pendukung, label kategori,
  metadata. Tidak terlalu abu-abu, tidak terlalu coklat.
- **Tertiary (#C8823A):** Tembaga — satu-satunya aksen interaktif. Digunakan
  eksklusif untuk CTA, tombol utama, harga aktif, dan ikon tab aktif.
  Jangan dipakai untuk dekorasi — simpan untuk aksi yang penting.
- **Tertiary Container (#E8A55A):** Versi lebih terang dari tembaga, hanya
  untuk hover state dan highlight kecil.
- **Neutral (#FAF7F2):** Linen putih — background utama. Bukan pure white
  agar mata tidak lelah dan terkesan premium.
- **Neutral Variant (#F0EBE3):** Untuk input field, divider, surface sekunder.
- **Surface (#FFFFFF):** Card menu dan modal — kontras ringan terhadap neutral.
- **Success (#2D6A4F):** Status "Siap" — hijau daun, bukan hijau neon.
- **Warning (#E07B39):** Status "Diproses" — amber hangat.
- **Error (#BA1A1A):** Untuk error form, bukan aksen dekoratif.

**Aturan warna penting:**
- Tidak ada gradien biru-ungu, tidak ada warna-warna dingin.
- Aksen tembaga maksimal tampil di 2–3 elemen per layar.
- Status badge selalu pakai warna background pastel + teks gelap, bukan
  background solid penuh.

---

## Typography

Sistem dua-font: satu display serif yang berkarakter, satu sans-serif bersih.

- **Playfair Display** — untuk semua heading (nama restoran, judul halaman,
  nama menu). Serif klasik ini memberi kesan editorial dan premium tanpa
  terasa kuno. Paired dengan ukuran yang cukup besar.
- **DM Sans** — untuk body text, label, harga, tombol. Geometric sans yang
  ramah dan mudah dibaca di ukuran kecil sekalipun. Digunakan untuk semua
  teks fungsional.

Hierarki yang harus dijaga ketat:
- Nama menu: Playfair Display 1.1rem semi-bold
- Harga: DM Sans 1.05rem bold, warna tertiary
- Deskripsi: DM Sans 0.85rem, warna secondary
- Label status: DM Sans 0.7rem uppercase letter-spaced
- Nama pelanggan/meja: Playfair Display di halaman welcome

**Jangan** campur dua serif berbeda. Playfair Display cukup satu saja.

---

## Layout

RestoScan adalah **mobile-first** app. Semua layout dirancang untuk layar
lebar 390px (iPhone standar) terlebih dahulu, baru ke desktop untuk kasir.

### Pelanggan (Mobile)

```
┌─────────────────────────┐
│  Header: Logo + Meja    │  sticky, bg: primary, teks: neutral
├─────────────────────────┤
│  Tab Kategori           │  horizontal scroll, pill shape
├─────────────────────────┤
│                         │
│  Menu Grid (2 kolom)    │  card dengan foto atas, info bawah
│                         │
│  - Foto (4:3 ratio)     │
│  - Nama (Playfair)      │
│  - Deskripsi (singkat)  │
│  - Harga + Tombol +     │
│                         │
├─────────────────────────┤
│  Cart Bar (fixed bottom)│  pill shape, bg: primary
└─────────────────────────┘
```

### Kasir (Desktop / Tablet)

```
┌──────────┬─────────────────────────────┐
│          │  Stats Bar (3 kotak)        │
│ Sidebar  ├─────────────────────────────┤
│          │                             │
│ - Stats  │  Order Grid (3 kolom)       │
│ - Filter │                             │
│ - Logout │  Setiap card:               │
│          │  - Nomor meja + nama        │
│          │  - List item pesanan        │
│          │  - Status badge             │
│          │  - Tombol aksi              │
└──────────┴─────────────────────────────┘
```

### Spacing Principle

Gunakan spacing yang **konsisten dan ritmis**. Jangan mix px dan rem
sembarangan. Selalu gunakan token spacing yang sudah didefinisikan.

- Padding kartu menu: `spacing.md` (16px)
- Gap antar kartu: `spacing.sm` (8px)
- Margin section: `spacing.xl` (32px)
- Padding halaman (horizontal): `spacing.md` (16px mobile), `spacing.2xl` (48px desktop)

---

## Elevation & Depth

Kedalaman dibangun melalui bayangan yang halus dan warna surface yang
berbeda — bukan border yang tebal.

```
Level 0: Background halaman (neutral #FAF7F2)
Level 1: Card menu (surface #FFFFFF + shadow xs)
Level 2: Cart bar, modal (surface + shadow md)
Level 3: Bottom sheet, overlay (+ backdrop blur)
```

**Shadow scale:**
```css
--shadow-xs: 0 1px 3px rgba(28, 20, 16, 0.06);
--shadow-sm: 0 2px 8px rgba(28, 20, 16, 0.08);
--shadow-md: 0 4px 16px rgba(28, 20, 16, 0.12);
--shadow-lg: 0 8px 32px rgba(28, 20, 16, 0.16);
```

Bayangan selalu menggunakan warna primary (espresso), bukan hitam murni.
Ini membuat shadow terasa hangat, bukan dingin/abu.

---

## Shapes

Gunakan border-radius yang konsisten. Jangan campur bentuk terlalu banyak.

- **Kartu menu:** `rounded.lg` (20px) — terasa friendly
- **Tombol CTA:** `rounded.full` — pill shape, modern dan jelas sebagai aksi
- **Input field:** `rounded.md` (14px) — tidak terlalu kotak, tidak terlalu bulat
- **Badge status:** `rounded.full` — beda dari card, mudah dibedakan
- **Cart bar:** `rounded.xl` (28px) — pill besar, melayang di atas layar
- **Foto menu:** sudut atas saja yang rounded (sesuai card parent)

---

## Components

### Kartu Menu

Foto di atas (rasio 4:3, object-fit cover), info di bawah. Tidak ada
border, hanya shadow ringan. Tombol "+" berbentuk lingkaran di pojok
kanan bawah area info — warna tertiary.

Saat item sudah ada di keranjang: tampilkan kontrol qty (+/-) inline
menggantikan tombol "+". Animasi transisi smooth.

### Cart Bar (Fixed Bottom)

Pill shape gelap melayang di atas konten. Dua sisi: kiri menampilkan
jumlah item dan total harga (teks putih), kanan tombol "Pesan →" (warna
tertiary, rounded full). Ada safe area padding di bawah untuk iPhone.

### Status Badge

Selalu pill shape. Warna background pastel, teks gelap sesuai kategori.
Didahului icon emoji kecil:
- ⏳ Pending
- 👨‍🍳 Diproses  
- ✅ Siap
- 🎉 Selesai

### Kasir Order Card

Kartu dengan border kiri berwarna sesuai status (4px solid). Background
putih. Header card: nomor meja bold + nama pelanggan. Body: list item
pesanan. Footer: badge status + tombol aksi berikutnya.

Tombol aksi kasir menggunakan warna yang sesuai status target:
- "Mulai Masak" → amber/warning
- "Tandai Siap" → success/hijau
- "Selesai" → secondary/abu

### Input Field

Background neutral-variant (bukan putih), tanpa border default. Border
muncul hanya saat focus (1.5px tertiary). Label di atas field (bukan
placeholder saja). Padding generous: 14px 16px.

### Tab Kategori

Horizontal scroll tanpa scrollbar. Pill shape dengan padding `sm md`.
State: inactive (neutral-variant bg, secondary text), active (primary bg,
neutral text). Transisi smooth 200ms.

---

## Do's and Don'ts

### ✅ Lakukan

- Gunakan foto makanan yang menarik dan high-quality sebagai visual utama
- Tampilkan harga dengan jelas — warna tertiary, font bold
- Beri feedback visual instan saat tombol ditekan (scale 0.96, shadow berkurang)
- Gunakan loading skeleton (bukan spinner) saat fetch menu
- Jaga konten status page tetap minimal — satu informasi utama: status saat ini
- Di kasir dashboard, urutkan pesanan: Diproses → Siap → Pending → Selesai

### ❌ Jangan

- Jangan pakai gradien biru-ungu atau warna dingin manapun
- Jangan tampilkan lebih dari 3 CTA button dalam satu layar
- Jangan gunakan font size di bawah 13px untuk konten penting
- Jangan pakai border yang mencolok untuk kartu — gunakan shadow
- Jangan pakai animasi yang lambat (>400ms) untuk transisi UI
- Jangan tampilkan UUID order_id secara penuh ke pelanggan — cukup 6 digit terakhir
- Jangan gunakan warna tertiary (tembaga) untuk elemen non-interaktif
- Jangan tampilkan error teknis ke pelanggan — pakai pesan ramah bahasa Indonesia