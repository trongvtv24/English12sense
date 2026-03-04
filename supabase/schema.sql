-- ==========================================
-- SUPABASE SCHEMA: 12 TENSES APP CHO BÉ
-- Chạy đoạn mã này trong thẻ "SQL Editor" của Supabase
-- ==========================================

-- 1. Bảng PROFILES (Lưu thông tin người chơi, kế thừa auth.users)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name text,
  avatar_url text, -- URL hình ảnh hoạt hình
  current_level integer DEFAULT 1, -- Level 1: Hiện tại đơn (Mở khóa dần)
  total_stars integer DEFAULT 0, -- Tổng điểm sao tích luỹ
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bật RLS cho profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Mỗi bé chỉ được xem/sửa profile của chính mình
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Trigger: Tự động tạo profiles mỗi khi có user mới đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==========================================
-- 2. Bảng GAME_SCORES (Lịch sử điểm số mini-games)
CREATE TABLE public.game_scores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  game_type text NOT NULL, -- VD: 'drag_drop', 'speed_quiz', 'highlight'
  score integer NOT NULL DEFAULT 0,
  max_combo integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bật RLS
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Chỉ xem dữ liệu của mình 
CREATE POLICY "Users can view own game scores" 
ON game_scores FOR SELECT 
USING (auth.uid() = user_id);

-- Cho phép INSERT điểm khi chơi xong
CREATE POLICY "Users can insert own game scores" 
ON game_scores FOR INSERT 
WITH CHECK (auth.uid() = user_id);


-- ==========================================
-- 3. Bảng FLASHCARD_PROGRESS (Thuật toán ghi nhớ)
CREATE TABLE public.flashcard_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  card_id text NOT NULL, -- Ví dụ: 'present_simple_always'
  memory_level integer DEFAULT 1, -- 1: Mới học, 5: Nhớ rất dai
  next_review_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- RLS Flashcard
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own flashcard progress" 
ON flashcard_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcard progress"
ON flashcard_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcard progress"
ON flashcard_progress FOR UPDATE
USING (auth.uid() = user_id);

-- Ràng buộc (1 user chỉ có 1 record tương ứng với 1 card_id)
ALTER TABLE public.flashcard_progress 
ADD CONSTRAINT unique_user_card UNIQUE (user_id, card_id);
