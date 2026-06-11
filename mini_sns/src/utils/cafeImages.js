export const CAFE_IMAGES = [
  // ── 커피 & 음료 ──────────────────────────────────────
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop', // 라떼아트 위에서
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', // 아메리카노
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', // 카푸치노
  'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop', // 라떼아트 옆
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop', // 원두
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=400&fit=crop', // 드리핑

  // ── 바리스타 & 인물 ───────────────────────────────────
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=400&fit=crop', // 바리스타 작업
  'https://images.unsplash.com/photo-1507133750040-4a209f4f9d6a?w=400&h=400&fit=crop', // 바리스타 포트레이트
  'https://images.unsplash.com/photo-1524350876685-274059332603?w=400&h=400&fit=crop', // 라떼 만들기
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=400&fit=crop', // 카페 대화
  'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=400&fit=crop', // 카페 사람들
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop', // 노트북 카페

  // ── 카페 풍경 & 인테리어 ──────────────────────────────
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop', // 아늑한 카페
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop', // 창가 자리
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=400&fit=crop', // 테이블 세팅
  'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=400&fit=crop', // 카페 외관
  'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=400&fit=crop', // 카페 카운터

  // ── 디저트 & 베이커리 ────────────────────────────────
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop', // 초콜릿케이크
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', // 마카롱
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop', // 도넛
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop', // 크루아상
  'https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=400&h=400&fit=crop', // 베이커리
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=400&fit=crop', // 브런치
  'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=400&fit=crop', // 디저트 플레이트
]

export const getRandomCafeImage = () =>
  CAFE_IMAGES[Math.floor(Math.random() * CAFE_IMAGES.length)]

export const getCafeImageById = (id) =>
  CAFE_IMAGES[id.charCodeAt(0) % CAFE_IMAGES.length]

export const resolvePostImage = (url, id) => {
  if (!url || url.includes('loremflickr.com') || url.includes('picsum.photos')) {
    return getCafeImageById(id)
  }
  return url
}
