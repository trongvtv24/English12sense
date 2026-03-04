import { createBrowserClient } from '@supabase/ssr'

// Hàm trợ giúp khởi tạo Supabase Client ở Frontend (Trình duyệt)
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
