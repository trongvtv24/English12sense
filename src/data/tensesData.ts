export type TenseZone = 'PAST' | 'PRESENT' | 'FUTURE';

export interface TenseData {
    id: string;
    name: string;
    zone: TenseZone;
    position: { left: string };
    borderColor: string;
    icon: string;
    isLockedDefault: boolean;
    nickname: string;
    description: string;
    keywords: string[];
    exampleHtml: string;
    requiredLevel: number;
}

export const tensesData: TenseData[] = [
    // --- PAST ---
    {
        id: 'past-perfect',
        name: 'Quá khứ hoàn thành',
        zone: 'PAST',
        position: { left: '20vw' },
        borderColor: '#b91c1c',
        icon: '🔒', // Will be replaced by real icon when unlocked
        isLockedDefault: true,
        nickname: '',
        description: 'Việc xảy ra trước 1 việc khác ở Quá khứ.',
        keywords: ['before', 'after', 'by the time'],
        exampleHtml: 'The train <b>had left</b> before I <i>arrived</i>. 🚂',
        requiredLevel: 5
    },
    {
        id: 'past-perfect-continuous',
        name: 'Quá khứ HT Tiếp diễn',
        zone: 'PAST',
        position: { left: '40vw' },
        borderColor: '#dc2626',
        icon: '🔒',
        isLockedDefault: true,
        nickname: '',
        description: 'Hành động xảy ra liên tục trước 1 mốc thời gian trong quá khứ.',
        keywords: ['for', 'since', 'how long'],
        exampleHtml: 'He <b>had been working</b> for 2 hours before she <i>came</i>. ⏱️',
        requiredLevel: 7
    },
    {
        id: 'past-simple',
        name: 'Quá khứ đơn',
        zone: 'PAST',
        position: { left: '60vw' },
        borderColor: '#ef4444',
        icon: '❌',
        isLockedDefault: false,
        nickname: 'Mảnh cắt dứt khoát',
        description: 'Chỉ một hành động đã diễn ra và KẾT THÚC HẲN trong quá khứ.',
        keywords: ['yesterday', 'last week', 'in 2020'],
        exampleHtml: 'I <b>played</b> soccer <i>yesterday</i>. ⚽',
        requiredLevel: 1
    },
    {
        id: 'past-continuous',
        name: 'Quá khứ tiếp diễn',
        zone: 'PAST',
        position: { left: '80vw' },
        borderColor: '#f87171',
        icon: '🔒',
        isLockedDefault: true,
        nickname: 'Sự việc dang dở',
        description: 'Hành động ĐANG XẢY RA tại một thời điểm cụ thể trong quá khứ.',
        keywords: ['at 8PM yesterday', 'when', 'while'],
        exampleHtml: 'I <b>was playing</b> soccer at 8PM <i>yesterday</i>. 🌙',
        requiredLevel: 3
    },

    // --- PRESENT ---
    {
        id: 'present-perfect',
        name: 'Hiện tại hoàn thành',
        zone: 'PRESENT',
        position: { left: '120vw' },
        borderColor: '#16a34a',
        icon: '🏹',
        isLockedDefault: false,
        nickname: 'Mũi tên dính lẹo',
        description: 'Bắt đầu ở quá khứ, nhưng kết quả KHÔNG DỨT KHOÁT mà dính lẹo tới hiện tại.',
        keywords: ['just', 'already', 'since', 'for', 'yet'],
        exampleHtml: 'I <b>have played</b> soccer <i>for 3 years</i>. 👟',
        requiredLevel: 2
    },
    {
        id: 'present-perfect-continuous',
        name: 'Hiện tại HT Tiếp diễn',
        zone: 'PRESENT',
        position: { left: '135vw' },
        borderColor: '#22c55e',
        icon: '🔒',
        isLockedDefault: true,
        nickname: 'Mũi tên bốc cháy',
        description: 'Bắt đầu ở quá khứ, kéo dài LIÊN TỤC đến hiện tại (có thể tiếp tục ở tương lai).',
        keywords: ['all day', 'the whole week', 'since', 'for'],
        exampleHtml: 'I <b>have been playing</b> soccer <i>all morning</i>. 🔥',
        requiredLevel: 6
    },
    {
        id: 'present-simple',
        name: 'Hiện tại đơn',
        zone: 'PRESENT',
        position: { left: '150vw' },
        borderColor: '#4ade80',
        icon: '⭐',
        isLockedDefault: false,
        nickname: 'Vòng tròn thói quen',
        description: 'Chỉ thói quen lặp đi lặp lại hoặc sự thật hiển nhiên luôn đúng.',
        keywords: ['always', 'usually', 'every day'],
        exampleHtml: 'I <b>play</b> soccer <i>every day</i>. 🔄',
        requiredLevel: 1
    },
    {
        id: 'present-continuous',
        name: 'Hiện tại tiếp diễn',
        zone: 'PRESENT',
        position: { left: '165vw' },
        borderColor: '#86efac',
        icon: '📡',
        isLockedDefault: false,
        nickname: 'Radar đang quét',
        description: 'Sự việc đang xảy ra NGAY LÚC NÓI, ngay trước mắt bé.',
        keywords: ['now', 'right now', 'Look!', 'Listen!'],
        exampleHtml: '<i>Look!</i> He <b>is playing</b> soccer. 👀',
        requiredLevel: 1
    },

    // --- FUTURE ---
    {
        id: 'near-future',
        name: 'Tương lai gần',
        zone: 'FUTURE',
        position: { left: '220vw' },
        borderColor: '#0284c7',
        icon: '🚀',
        isLockedDefault: false,
        nickname: 'Tên lửa vào bệ phóng',
        description: 'Đã có kế hoạch/bằng chứng rõ ràng (có vé, có tiền, mây đen).',
        keywords: ['next week', 'tomorrow (có bằng chứng)'],
        exampleHtml: 'I <b>am going to play</b> soccer (I have the ball). ⚽',
        requiredLevel: 1
    },
    {
        id: 'future-simple',
        name: 'Tương lai đơn',
        zone: 'FUTURE',
        position: { left: '240vw' },
        borderColor: '#0ea5e9',
        icon: '💭',
        isLockedDefault: false,
        nickname: 'Bong bóng suy nghĩ',
        description: 'Chưa lên lịch trước, chỉ đoán mò hoặc quyết định bộc phát!',
        keywords: ['tomorrow', 'I think', 'maybe', 'probably'],
        exampleHtml: '<i>I think</i> I <b>will play</b> soccer. 💭',
        requiredLevel: 1
    },
    {
        id: 'future-continuous',
        name: 'Tương lai tiếp diễn',
        zone: 'FUTURE',
        position: { left: '260vw' },
        borderColor: '#38bdf8',
        icon: '🔒',
        isLockedDefault: true,
        nickname: 'Đồng hồ báo thức',
        description: 'Đang xảy ra tại MỘT THỜI ĐIỂM XÁC ĐỊNH trong tương lai.',
        keywords: ['at 10 AM tomorrow', 'at this time next week'],
        exampleHtml: 'I <b>will be playing</b> soccer <i>at 10 AM tomorrow</i>. ⏰',
        requiredLevel: 4
    },
    {
        id: 'future-perfect',
        name: 'Tương lai hoàn thành',
        zone: 'FUTURE',
        position: { left: '280vw' },
        borderColor: '#7dd3fc',
        icon: '🔒',
        isLockedDefault: true,
        nickname: 'Mũi tên chạm đích',
        description: 'Sẽ hoàn thành TRƯỚC một thời điểm trong tương lai.',
        keywords: ['by next month', 'before 2050', 'by the time'],
        exampleHtml: 'I <b>will have played</b> soccer <i>by 5 PM</i>. 🎯',
        requiredLevel: 8
    }
];
