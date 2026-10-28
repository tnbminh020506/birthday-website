# A little love letter ♡

React + Vite. Trải nghiệm sinh nhật gồm 20 màn bóng bay, bộ ảnh Polaroid và timeline lời chúc. Responsive cho điện thoại và máy tính.

Web hiển thị màn đếm ngược đến **07:00 ngày 29/10/2026 theo giờ Việt Nam** (`LAUNCH_AT` trong `src/main.jsx`). Đến giờ này, màn 20 bóng tự mở; các lần truy cập sau vẫn mở bình thường. Đồng hồ dùng thời gian trên thiết bị của người xem.

Khi chạy `npm run dev`, nút **Xem trước 20 bóng bay** trên màn đếm ngược cho phép kiểm tra toàn bộ trải nghiệm trước giờ mở. Nút này không xuất hiện trong bản build để deploy.

## Chạy

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Cá nhân hóa

Sửa `gift` ở đầu `src/main.jsx` để đổi tên và lời chúc. Bốn ảnh Polaroid hiện được import từ thư mục `assets/` và gắn vào `gift.photos` theo thứ tự: ảnh giữa, ảnh trái, ảnh phải, ảnh dưới. Đổi ảnh trong `assets/` với cùng tên tệp hoặc sửa các dòng import trong `src/main.jsx` để dùng ảnh khác. Ảnh chọn trực tiếp trên giao diện chỉ là bản xem thử trong phiên hiện tại; ảnh trong `assets/` sẽ đi cùng bản build và được giữ khi đưa lên GitHub/Vercel.

`themes` chứa 20 bảng màu và họa tiết bóng bay đa sắc, độc lập với phối hồng–đỏ–vàng của thiệp. Chỉ bóng đầu có lời nhắn. Mỗi lần chạm chạy một chuyển cảnh song song 1,2 giây: bóng và theme cũ cùng đi lên, mờ dần; theme mới đồng thời hiện dần và bóng mới đi vào từ mép dưới trước khi dây bóng cũ khuất hẳn. Không có bước chờ đổi nền riêng hay dải nối. Chờ hiệu ứng chuyển màn trước khi chạm tiếp. Không có nút bỏ qua. Quả thứ 20 mở trang sinh nhật sau khi chuyển nền xong. Luồng chuyển cảnh nằm trong `src/balloon-flow.jsx` và `src/balloon-flow.css`. Component `Anime` là minh họa SVG tạm thời, có thể thay bằng ảnh anime của bạn.

Font Google Fonts là tùy chọn, có font hệ thống dự phòng. Không cần tài khoản, không thu thập hoặc tải ảnh lên máy chủ.

## Demo bất ngờ sau bóng thứ 20

Chạm bóng cuối để bung 40 sticker, mưa giấy và chuỗi 12 tiếng “bụp”, sau đó mở khung “CHÚC MỪNG SINH NHẬT <TÊN>”. Nút “Bung quà lần nữa” trên thiệp phát lại hiệu ứng mà không phải thả lại 20 bóng.

- Đổi tên ở `gift.name` trong `src/main.jsx`.
- Các bộ nằm trong `src/birthday.jsx`: 8 sticker cũ, 9 biểu cảm Miyu Suzuki và 9 Pusheen. `heroStickers` chọn hình quanh khung, `photoStickers` chọn ảnh Polaroid, `wishStickers` chọn ảnh timeline. Hiệu ứng bung quà trộn cả ba bộ. Góc sưu tập trên thiệp hiển thị đủ 26 mẫu.
- Ảnh được lưu cố định trong `public/stickers/`, đi cùng GitHub/Vercel. Nguồn ảnh có trong `public/stickers/SOURCES.md`. Không phụ thuộc đường dẫn ảnh bên ngoài khi người nhận mở web.
- Âm thanh được tạo bằng Web Audio ngay trên máy, bắt đầu từ thao tác chạm bóng cuối. Nếu trình duyệt hoặc thiết bị tắt âm thì hiệu ứng hình ảnh vẫn chạy bình thường.
- Hiệu ứng tự kết thúc sau 3,5 giây; chế độ giảm chuyển động của thiết bị được tôn trọng.

## Âm thanh

Mỗi lần chạm bóng phát một tiếng “bụp”. Bản hộp nhạc Happy Birthday to You 03-6 (Dry / Short) của OtoLogic bắt đầu từ lần chạm đầu tiên và lặp xuyên suốt thiệp. Nút ở góc dưới phải bật/tắt toàn bộ âm thanh. Nhạc MP3 được lưu tại public/audio/happy-birthday-music-box.mp3; tiếng bụp được tổng hợp bằng Web Audio. Nút bật/tắt điều khiển cả hai. Nguồn và giấy phép CC BY 4.0 được ghi tại public/audio/CREDITS.md và chân trang.

