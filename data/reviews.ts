export interface Review {
  id: string;
  dogName: string;
  guardian: string;
  location: string;
  rating: number;
  text: string;
  breed?: string;
}

// 실제 고객 리뷰로 교체 예정 (dearpet_상품후기_150.csv 기반 시딩)
export const SUBSCRIBER_COUNT = 2400;

export const REVIEWS: Review[] = [
  {
    id: "r1",
    dogName: "망고",
    guardian: "망고 보호자",
    location: "서울 마포구",
    rating: 5,
    breed: "포메라니안",
    text: "알레르기 때문에 늘 성분표를 붙잡고 살았는데, 이제 그럴 필요가 없어요. 망고가 처음으로 간식을 남기지 않고 다 먹었어요.",
  },
  {
    id: "r2",
    dogName: "루이",
    guardian: "루이 보호자",
    location: "경기 성남시",
    rating: 5,
    breed: "웰시코기",
    text: "매달 카톡으로 구성을 미리 알려줘서 좋아요. 마음에 안 드는 간식은 반품하니 다음 박스가 점점 더 잘 맞아집니다.",
  },
  {
    id: "r3",
    dogName: "초코",
    guardian: "초코 보호자",
    location: "부산 해운대구",
    rating: 5,
    breed: "푸들",
    text: "닭 알레르기가 있어서 늘 조심했는데, 닭 성분 완전 제외해서 보내주니 안심이 돼요. 확실히 반응이 달라요.",
  },
  {
    id: "r4",
    dogName: "보리",
    guardian: "보리 보호자",
    location: "서울 송파구",
    rating: 4,
    breed: "비숑 프리제",
    text: "편식이 심한 아이인데 여기 간식은 유독 잘 먹네요. 반품 포인트로 다음 결제도 할인받아서 부담이 적어요.",
  },
  {
    id: "r5",
    dogName: "코코",
    guardian: "코코 보호자",
    location: "인천 연수구",
    rating: 5,
    breed: "말티즈",
    text: "성분을 전부 공개해서 믿고 시작했어요. 구성이 알차서 골라 먹이는 재미가 있어요.",
  },
  {
    id: "r6",
    dogName: "베리",
    guardian: "베리 보호자",
    location: "대전 유성구",
    rating: 5,
    breed: "잭 러셀 테리어",
    text: "구독 3개월째인데 베리 피부가 눈에 띄게 좋아졌어요. 건강 고민까지 반영해준다는 게 이런 거구나 싶어요.",
  },
];
