# Phase 02: Database Schema (Supabase)
Status: ⬜ Pending | 🟡 In Progress | ✅ Complete
Dependencies: Phase 01

## Objective
Thiết lập schema cơ sở dữ liệu trên Supabase để tracking tiến độ của bé và điểm số các mini-game.

## Implementation Steps
1. [ ] Mở Supabase project và lấy API keys.
2. [ ] Tạo SQL Migration/Schema cho bảng `profiles` (Kế thừa Supabase Auth).
3. [ ] Tạo schema bảng `game_scores` (user_id, game_type, score, created_at).
4. [ ] Tạo schema bảng `flashcard_progress` (user_id, card_id, memory_level).
5. [ ] Cài đặt Row Level Security (RLS) policies đảm bảo user nào chỉ thấy data của user đó.
6. [ ] Viết các helper functions trong codebase để fetch data từ Supabase.

## Next Phase
→ `/code phase-03`
