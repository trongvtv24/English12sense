# Phase 06: Integration, Testing & Deploy

## 1. Mục tiêu (Objective)
- Kiểm tra toàn bộ luồng ứng dụng từ trang chủ đến thư viện trò chơi.
- Đảm bảo giao diện hiển thị tốt trên mọi thiết bị (Responsive).
- Khắc phục các lỗi (nếu có) phát sinh trong quá trình tích hợp.
- Chuẩn bị dự án để deploy lên nền tảng Vercel.

## 2. Các Bước Thực Hiện (Tasks)

- [ ] **Task 1: Code Review & Refactoring**
  - Quét lại mã nguồn để loại bỏ mã không cần thiết, tối ưu console.log.
  - Kiểm tra Strict Type (TypeScript) trên toàn project (`tsc --noEmit`).

- [ ] **Task 2: Responsive Testing**
  - Đảm bảo `InteractiveTimeline` hoạt động tốt trên Mobile.
  - Đảm bảo `ArcadeZone` và 6 trò chơi không bị vỡ bố cục trên màn hình nhỏ.

- [ ] **Task 3: Integration Testing (Flow & State)**
  - Chơi thử toàn bộ 6 trò chơi từ đầu đến cuối để đảm bảo tính điểm đúng trên Zustand Store (`Header` báo điểm chính xác).
  - Kiểm tra hệ thống âm thanh (Audio Effects) mới được thêm vào.

- [ ] **Task 4: Production Build Check**
  - Chạy thử `npm run build` để đảm bảo không có quá trình build nào thất bại.

- [ ] **Task 5: Vercel Deploy & Documentation**
  - Hướng dẫn user cách kết nối Github và deploy lên Vercel.
  - Viết file `README.md` hoàn chỉnh cho project.

## 3. Hoàn thành
- Đánh dấu hoàn thành Phase 06.
- Kết thúc dự án English Tenses App.
