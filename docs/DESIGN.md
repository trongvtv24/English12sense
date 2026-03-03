# 🎨 DESIGN: Ứng dụng Học 12 Thì Tiếng Anh Cho Bé

Ngày tạo: 03/03/2026
Dựa trên: `docs/specs/12_tenses_app_spec.md`

---

## 1. Cách Lưu Thông Tin (Database Schema)

Dữ liệu được lưu trữ trên **Supabase**, gồm 3 bảng chính:

**👤 PROFILES (Thông tin bé)**
- `id` (liên kết với Supabase Auth)
- `display_name` (Tên hiển thị)
- `avatar_url` (Hình đại diện hoạt hình)
- `current_level` (Cấp độ hiện tại để mở khóa thì)

**🎮 GAME_SCORES (Điểm số trò chơi)**
- `id` (Mã lượt chơi)
- `user_id` (Của bé nào)
- `game_type` (Loại game: highlight, drag-drop, speed-quiz...)
- `score` (Điểm đạt được)
- `max_combo` (Chuỗi đúng liên tiếp)
- `created_at` (Ngày chơi)

**🃏 FLASHCARD_PROGRESS (Tiến độ học thẻ bài)**
- `id`
- `user_id`
- `card_id` (Mã thẻ từ khóa, VD: 'present-simple-always')
- `memory_level` (Mức độ nhớ: 1 đến 5, thẻ rớt xuống 1 sẽ bị nhắc lại nhiều)
- `next_review_date` (Ngày cần ôn lại)

---

## 2. Danh Sách Màn Hình

| # | Tên | Mục đích |
|---|-----|----------|
| 1 | **Trang Chủ (Dashboard)** | Giao diện tổng quan, hiển thị Avatar lớn, tổng điểm sao và Tiến độ học. |
| 2 | **Bản Đồ Timeline (12 Thì)**| Trục thời gian khổng lồ (bắt đầu mở khóa dần từ Hiện tại đơn -> quá khứ -> tương lai). |
| 3 | **Khu Vui Chơi (Arcade)** | Menu chọn 6 Mini-games. Có hiển thị điểm cao nhất kỷ lục. |
| 4 | **Màn hình In-Game** | Giao diện khi bé đang chơi của từng loại game (có đồng hồ đếm ngược, thanh máu/điểm). |
| 5 | **Góc Phụ Huynh** | Nơi ba mẹ xem biểu đồ điểm số, lỗi bé hay mắc phải (bị khóa bằng mật khẩu/toán đố). |

---

## 3. Luồng Hoạt Động (User Journey)

**📍 HÀNH TRÌNH 1: Lần đầu tiên bé vào App**
1. Mở App -> Thấy màn hình chào mừng sinh động.
2. Cha mẹ tạo tài khoản/chọn nhân vật ngộ nghĩnh cho bé.
3. App hướng dẫn bé tương tác với "Trục Timeline" đầu tiên (Chỉ mở khóa *Hiện tại đơn*).
4. Bé dạo qua Timeline, click thử vào icon và chơi thử game "Rổ thời gian" với vài từ khóa cơ bản.

**📍 HÀNH TRÌNH 2: Học hằng ngày của bé**
1. Mở app -> "Bạn có 5 thẻ bài sắp quên, lật ngay nào!"
2. Bé chơi lật thẻ bài Flashcard.
3. Sau khi ôn xong -> Vào khu Arcade chơi "Bắn tàu vũ trụ" để tích điểm lấy sao.
4. Mở khóa thêm được thì *Quá khứ đơn* trên Timeline.

---

## 4. Checklist Kiểm Tra (Acceptance Criteria & Test Cases)

### Tính năng: Trục Timeline (Interactive Timeline)
✅ **Cơ bản:**
- [ ] Cuộn/Zoom ngang được bằng chuột hoặc vuốt cảm ứng.
- [ ] Timeline chia làm 3 vùng màu (Quá khứ 🔴, Hiện tại 🟢, Tương lai 🔵).
- [ ] Click vào một "Thì", modal thông tin sẽ Pop-up (Tên -> Dấu hiệu -> Ví dụ).

✅ **Nâng cao:**
- [ ] Các thì chưa học sẽ bị làm mờ (Grayscale) và có hình ổ khóa.
- [ ] Animation bay bổng khi mở khóa thì mới.

### Tính năng: Lưu Điểm (Game Scores)
✅ **Cơ bản:**
- [ ] Chơi xong game, điểm được tự động lưu vào Supabase.
- [ ] Điểm hiển thị cập nhật ngay ở màn hình Dashboard không cần load lại trang.

📝 **Test Cases:**
**TC-01: Chơi xong game thành công**
- Given: Bé đã đăng nhập, bắt đầu chơi "Bắn tàu".
- When: Hết giờ, bé đạt 500 điểm.
- Then: ✓ Số điểm bay vào quỹ sao. ✓ Lưu DB thành công.

---
*Tạo bởi AWF 2.1 - Design Phase*
