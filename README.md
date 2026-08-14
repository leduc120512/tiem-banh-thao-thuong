# Thảo Thương Bakery

Website một trang cho tiệm bánh sinh nhật Thảo Thương — 503 QL1A, Ninh Phạm, Quảng Ninh,
Quảng Xương, Thanh Hoá (ngã ba Cống Trúc). React + Vite + GSAP.

```bash
npm install
npm run dev       # máy chủ phát triển
npm run build     # tsc -b && vite build
npm run preview   # xem thử bản build
npm run lint
npm run images    # nén lại ảnh từ assets-raw/ sang public/img/
```

## Sửa nội dung ở đâu

Gần như mọi thứ nằm trong **`src/data/site.ts`**: địa chỉ, số điện thoại, giờ mở cửa,
danh sách mẫu bánh, bảng size, danh mục trang trí, các bước đặt bánh, review.

Vài chỗ **cần chủ tiệm xác nhận lại** (đã đánh dấu `TODO` trong file):

| Mục | Giá trị đang để tạm |
| --- | --- |
| `shop.hours` | 6:00 – 21:30 (T2–T7), 6:00 – 22:00 (CN) |
| `shop.leadTime` | Đặt trước tối thiểu 4 tiếng |
| `shop.delivery` | Giao trong bán kính 10km |
| `sizes` / `toppings` | Bảng giá tham khảo (16cm 180k → 25cm 520k) |
| `reviews` | 4 lời khách viết mẫu — nên thay bằng ảnh chụp Zalo/Facebook thật |
| `shop.facebook` | Đang trỏ tới trang tìm kiếm, nên thay bằng link fanpage thật |

Riêng phần mô tả từng mẫu bánh (`cakes[].note`) và câu chữ trên đế (`cakes[].msg`)
đều lấy đúng từ ảnh thật của tiệm.

## Thêm ảnh bánh mới

1. Bỏ ảnh gốc vào `assets-raw/cakes/` (đặt tên `cake-17.jpg`, …).
2. `npm run images` — sinh bản webp 640px và 1200px vào `public/img/`.
3. Thêm một mục vào mảng `cakes` trong `src/data/site.ts`.
   `ar` là tỉ lệ rộng/cao của ảnh gốc (xem `public/img/manifest.json`).

Thư mục `assets-raw/` chỉ để lưu bản gốc, **không** được đóng gói khi build.

## Cấu trúc

```
src/
  data/site.ts              toàn bộ nội dung
  lib/anim.ts               đăng ký GSAP, các media query, hàm hé mở dùng chung
  lib/useSmoothScroll.ts    Lenis — chỉ bật ở desktop khoẻ
  components/
    Header, Preloader, Cursor, StickyCta, CakeSheet
    sections/               Hero → Footer, mỗi mảng một .tsx + .css
    ui/                     Img, Logo, Deco (viền kem chảy, nến, vụn cốm)
```

## Vài quyết định đáng nhớ

- **Đế bánh vát góc.** Tiệm dùng đế xốp vuông vát bốn góc, nên mọi khung ảnh trên web
  đều là hình bát giác (`.board`, `clip-path`), không phải thẻ bo tròn.
- **Chữ bắt kem là chữ thật.** Dòng chú thích dưới mỗi ảnh chính là câu tiệm đã viết
  lên đế bánh đó. Dải chạy ở đầu trang cũng vậy.
- **Viền kem chảy thay đường kẻ.** Ranh giới giữa các mảng là `<Drip>` — lấy từ mẫu
  bánh drip có thật.
- **Bàn thiết kế bánh** (`#dat-banh`) dựng lại chiếc bánh nhìn từ trên xuống bằng SVG;
  viền bắt sò là nét đứt đầu tròn nên chạy được cho cả ba kiểu dáng.
- **Danh mục không phải lưới thẻ** mà là một mục lục; trên desktop ảnh bám theo con trỏ.

## Chuyển động

Tất cả hiệu ứng cuộn nằm trong `gsap.matchMedia()`. Ba mức:

- `prefers-reduced-motion: reduce` → không chạy gì, nội dung hiện đủ ngay từ đầu
  (CSS chỉ ẩn trước khi hiện khi `<html>` có class `anim`, do script inline trong
  `index.html` gắn).
- màn hẹp hoặc máy yếu (`lightDevice()`: ≤4 nhân hoặc ≤4GB RAM) → bỏ parallax,
  bỏ ghim mảng, kệ bánh chuyển sang cuộn ngang bằng ngón tay.
- desktop khoẻ → đủ bộ: ghim + cuộn ngang, parallax, con trỏ tuỳ biến, Lenis.

Khi mảng "Mẫu tiệm làm nhiều nhất" được ghim, JS gắn class `is-pinned`; nếu không ghim
(giảm chuyển động / máy yếu) thanh cuộn ngang của trình duyệt vẫn còn để với tới hết mẫu.

## Liên hệ trong web

Nút đặt bánh mở `https://zalo.me/0976608474`, nút gọi mở `tel:`. Bàn thiết kế chép
sẵn nội dung đơn vào clipboard để khách dán thẳng vào Zalo.
