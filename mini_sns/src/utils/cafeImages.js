export const CAFE_IMAGES = [
  // ── 커피 & 음료 (6) ──────────────────────────────────
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop', // 라떼아트 위
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', // 블랙커피
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', // 카푸치노
  'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop', // 라떼아트 옆면
  'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop', // 아이스커피
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop', // 에스프레소

  // ── 바리스타 & 인물 (6) ──────────────────────────────
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=400&fit=crop', // 바리스타 작업
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=400&fit=crop', // 드립 포어링
  'https://images.unsplash.com/photo-1507133750040-4a209f4f9d6a?w=400&h=400&fit=crop', // 바리스타 포트레이트
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=400&fit=crop', // 카페 대화
  'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=400&fit=crop', // 카페 손님들
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop', // 원두 로스팅

  // ── 카페 풍경 & 인테리어 (6) ─────────────────────────
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop', // 아늑한 카페 내부
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop', // 창가 자리
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=400&fit=crop', // 카페 테이블
  'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=400&fit=crop', // 카페 외관
  'https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=400&h=400&fit=crop', // 베이커리 진열
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop', // 커피 브루잉

  // ── 디저트 & 베이커리 (6) ────────────────────────────
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop', // 초콜릿 케이크
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', // 마카롱
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop', // 도넛
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop', // 크루아상
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=400&fit=crop', // 브런치 플레이트
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop', // 와플 디저트
]

// 새 게시물 작성 — 연속 중복 방지
let _lastIdx = -1
export const getRandomCafeImage = () => {
  let idx
  do { idx = Math.floor(Math.random() * CAFE_IMAGES.length) }
  while (idx === _lastIdx)
  _lastIdx = idx
  return CAFE_IMAGES[idx]
}

// 게시물 목록 — listIndex 기반 순차 배분 (중복 없음)
export const resolvePostImage = (url, listIndex) => {
  if (!url || url.includes('loremflickr.com') || url.includes('picsum.photos')) {
    return CAFE_IMAGES[listIndex % CAFE_IMAGES.length]
  }
  return url
}
