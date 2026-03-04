import { createClient } from './client'

// -- HELPER FETCH DATA TỪ DB CHO VUI CHƠI --

/**
 * Lấy lịch sử 10 trò chơi gần nhất của bé
 */
export async function getRecentGameScores() {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
        .from('game_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

    if (error) {
        console.error('Lỗi lấy điểm:', error)
        return []
    }
    return data
}

/**
 * Lưu điểm mới sau khi bé chơi xong 1 mini game
 */
export async function saveGameScore(gameType: string, score: number, maxCombo: number = 0) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
        .from('game_scores')
        .insert([
            {
                user_id: user.id,
                game_type: gameType,
                score,
                max_combo: maxCombo
            }
        ])

    if (error) console.error('Lỗi cập nhật điểm:', error)
    return data
}

/**
 * Lấy tiến độ Flashcard cần ôn tập ngay hôm nay
 */
export async function getCardsToReviewToday() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    // Lấy thẻ nhớ có ngày review <= thì hiện tại
    const { data, error } = await supabase
        .from('flashcard_progress')
        .select('*')
        .eq('user_id', user.id)
        .lte('next_review_date', new Date().toISOString())

    if (error) {
        console.error('Lỗi lấy flashcards ôn:', error)
        return []
    }
    return data
}
