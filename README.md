# English Tenses Explorer (App Học 12 Thì Tiếng Anh Cho Bé 9 Tuổi)

**English Tenses Explorer** là một ứng dụng Web tương tác với giao diện Gamification giúp trẻ em độ tuổi tiểu học (9+ tuổi) nắm vững cấu trúc và dấu hiệu nhận biết của 12 thì trong tiếng Anh một cách thú vị, trực quan và không bị nhàm chán.

Ứng dụng được thiết kế theo chuẩn hướng dẫn thực thi (Production Level), ưu tiên giao diện bắt mắt, hiệu ứng mượt mà (Framer Motion) và kiến trúc vững chắc bằng Next.js + TailwindCSS + Zustand.

## 🚀 Tính năng nổi bật

### 1. Trục Thời Gian Tương Tác (Interactive Timeline)
- Trực quan hóa 12 thì trải dài trên 3 mốc: Quá khứ, Hiện tại, Tương lai.
- Kéo thả để cuộn (Drag to Scroll) mượt mà bằng Framer Motion.
- Mỗi thì là một điểm chạm, click vào để xem Popup thông tin chi tiết (Công thức, Phủ định, Nghi vấn).
- Cơ chế "Mở khóa dần" (Unlock system) giúp trẻ em không bị ngợp thông tin.

### 2. Khu Vui Chơi (Arcade Zone)
- 6 Mini-games tập trung vào việc **Luyện Phản Xạ Dấu Hiệu** (Clue word recognition):
  - 🧺 **Rổ Thời Gian:** Game kéo thả (Drag and Drop) từ khóa vào đúng giỏ mốc thời gian.
  - 🔍 **Máy Quét Dấu Hiệu:** Tìm và nhấp vào "thần chú" (từ khóa) đang ẩn nấp trong câu ví dụ.
  - 🃏 **Thẻ Bài Ma Thuật:** Ứng dụng lật thẻ (3D Flip Animation) học nhanh lý thuyết 12 thì.
  - 🚀 **Bắn Tàu Vũ Trụ:** Speed quiz phản xạ trắc nghiệm nhanh với hiệu ứng thiên thạch rơi.
  - 🐛 **Thợ Săn Bắt Bọ:** Click vào từ sai ngữ pháp trong câu để sửa lại.
  - 🧱 **Xây Cầu Qua Sông:** Sắp xếp lại thứ tự các từ bị xáo trộn để tạo thành câu hoàn chỉnh (Reorder component).

### 3. Hệ thống Điểm thưởng & Cấp độ
- State Game (Level, Năng lượng, Tense đã mở khóa) được quản lý toàn cục bằng `Zustand`.
- Hiển thị trực tiếp điểm số trên thanh Header (Live tracking).
- Hệ thống âm thanh (Audio API) tự phát sinh không cần file mp3, giúp ứng dụng nhẹ mà vẫn có feedback sinh động.

## 💻 Tech Stack Sử Dụng

- **Framework:** [Next.js](https://nextjs.org/) (App Router).
- **Ngôn ngữ:** TypeScript (Strict Mode).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS cho hiệu ứng 3D perspective.
- **Animations:** [Framer Motion](https://www.framer.com/motion/).
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).
- **Icons:** [Lucide React](https://lucide.dev/).
- **Database (Kế hoạch tích hợp):** Supabase (PostgreSQL).

## 🛠 Hướng dẫn Cài đặt & Khởi chạy

Dự án này sử dụng Node.js và npm. Yêu cầu môi trường Node.js v18 trở lên.

1. **Clone project và cài đặt packages:**
   ```bash
   npm install
   ```

2. **Chạy ở môi trường Development:**
   ```bash
   npm run dev
   ```
   Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

3. **Build cho Production:**
   ```bash
   npm run build
   npm run start
   ```

## 🌐 Hướng dẫn Deploy lên Vercel

Dự án được tối ưu 100% để deploy trực tiếp lên [Vercel](https://vercel.com/) (Nền tảng host Next.js của nhà phát hành).

1. Đẩy code của bạn lên một Repo trên Github (`git push origin main`).
2. Đăng nhập vào [Vercel.com](https://vercel.com/) bằng tài khoản Github của bạn.
3. Chọn thẻ **Add New -> Project**.
4. Import project Repository bạn vừa tạo trên Github.
5. Để tất cả thiết lập ở dạng mặc định (Framework Preset: Next.js).
6. Bấm **Deploy**. Vercel sẽ tự động build và cung cấp cho bạn 1 đường link Live (Ví dụ: `english-tenses.vercel.app`).

---
🌟 *Design & Developed with Antigravity Workflow Framework (AWF).*
