import { NextRequest, NextResponse } from "next/server";
import type { Attraction } from "@/lib/types";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

// ── Fallback mock data (Gemini quota 소진 시 사용) ──────────────────────────
const MOCK_ATTRACTIONS: Record<string, Attraction[]> = {
  도쿄: [
    { id: "tokyo-senso-ji", name: "센소지", description: "도쿄에서 가장 오래된 사찰로 나리타산 신쇼지와 함께 일본을 대표하는 불교 사원입니다.", category: "history-culture", estimatedDurationMinutes: 90, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Senso-ji+Tokyo", detailedDescription: "아사쿠사에 위치한 도쿄 최고(最古) 사찰. 나카미세 쇼핑가를 지나 경내로 들어서면 웅장한 본당이 맞이합니다. 새벽 일찍 방문하면 붐비지 않고 사진 찍기에 좋습니다.", nearby: [{ name: "아사쿠사 이마한", type: "restaurant", description: "100년 전통의 스키야키 전문점" }] },
    { id: "tokyo-imperial-palace", name: "황거 동교원", description: "일본 왕실의 거주지인 황거 주변의 아름다운 동쪽 정원입니다.", category: "history-culture", estimatedDurationMinutes: 60, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Imperial+Palace+East+Garden+Tokyo", detailedDescription: "에도성 터에 조성된 일본식 정원. 계절마다 매화, 벚꽃, 국화가 피어 사시사철 방문객이 끊이지 않습니다. 입장 무료이며 사전 예약 불필요합니다.", nearby: [{ name: "팰리스 호텔 라운지", type: "cafe", description: "황거 뷰를 즐길 수 있는 고급 카페" }] },
    { id: "tokyo-edo-museum", name: "에도도쿄 박물관", description: "에도 시대부터 현대 도쿄까지의 역사를 실물 크기 모형으로 전시하는 박물관입니다.", category: "history-culture", estimatedDurationMinutes: 120, isFree: false, estimatedEntranceFee: "약 ₩800", recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/Edo-Tokyo+Museum", detailedDescription: "니혼바시 다리 실물 크기 모형과 에도 서민 생활상을 재현한 전시가 압권입니다. 영어·한국어 오디오 가이드를 제공하며 반나절 코스로 적합합니다.", nearby: [{ name: "료고쿠 챤코 나베", type: "restaurant", description: "스모 선수들이 즐겨 먹는 챤코 나베 전문점" }] },
    { id: "tokyo-shinjuku-gyoen", name: "신주쿠 교엔", description: "58.3헥타르 규모의 대형 국립공원으로 일본식·프랑스식·영국식 정원이 공존합니다.", category: "nature-relaxation", estimatedDurationMinutes: 120, isFree: false, estimatedEntranceFee: "약 ₩300", recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Shinjuku+Gyoen", detailedDescription: "봄 벚꽃 시즌에 약 1,000그루의 벚나무가 만개합니다. 넓은 잔디밭에서 피크닉을 즐기기에 최적이며 술·음식 반입 금지입니다.", nearby: [{ name: "신주쿠 나카무라야", type: "cafe", description: "100년 전통의 카레빵·커피 전문 카페" }] },
    { id: "tokyo-odaiba-beach", name: "오다이바 해변공원", description: "도쿄만을 조망하며 레인보우 브리지와 도심 야경을 감상할 수 있는 인공 해변입니다.", category: "nature-relaxation", estimatedDurationMinutes: 90, isFree: true, recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/Odaiba+Beach+Park+Tokyo", detailedDescription: "자유의 여신상 복제품과 레인보우 브리지가 포토스팟입니다. 저녁에는 도심 야경이 수면에 반사되어 환상적인 풍경을 만들어냅니다.", nearby: [{ name: "다이버 시티 푸드코트", type: "restaurant", description: "건담 전시와 함께 즐기는 다양한 일본 음식" }] },
    { id: "tokyo-ueno-park", name: "우에노 공원", description: "도쿄 최대의 공원으로 동물원·국립박물관·미술관이 밀집한 문화 복합 공간입니다.", category: "nature-relaxation", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "anytime", googleMapsUrl: "https://www.google.com/maps/search/Ueno+Park+Tokyo", detailedDescription: "봄에는 약 1,200그루의 벚나무가 터널을 이루고, 연못에는 연꽃이 가득합니다. 주말에는 노천 시장과 버스킹 공연도 열립니다.", nearby: [{ name: "우에노 야부 소바", type: "restaurant", description: "140년 전통의 수타 소바 전문점" }] },
    { id: "tokyo-tsukiji", name: "츠키지 외부 시장", description: "세계 최대 수산시장이었던 츠키지의 외부 시장으로 신선한 해산물과 길거리 음식의 천국입니다.", category: "food-market", estimatedDurationMinutes: 90, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Tsukiji+Outer+Market+Tokyo", detailedDescription: "새벽 5시부터 문을 여는 노점들에서 신선한 회·계란말이·타마고야끼 등을 즐길 수 있습니다. 오전 11시 이후에는 대부분의 가게가 마감합니다.", nearby: [{ name: "스시 다이", type: "restaurant", description: "현지인이 줄 서는 오마카세 스시 가게" }] },
    { id: "tokyo-shibuya-food", name: "시부야 야타이 골목", description: "시부야역 근처 다양한 이자카야와 야키토리 골목으로 일본 현지 술집 문화를 체험할 수 있습니다.", category: "food-market", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/Shibuya+Nonbei+Yokocho+Tokyo", detailedDescription: "논베이 요코쵸(のんべい横丁)는 작은 골목에 30여 개의 아담한 이자카야가 밀집해 있습니다. 일본 샐러리맨들과 어울려 야키토리와 하이볼 한 잔의 저녁을 즐겨보세요.", nearby: [{ name: "와타미 시부야점", type: "restaurant", description: "대형 이자카야 체인으로 다양한 메뉴와 합리적인 가격" }] },
    { id: "tokyo-depachika", name: "이세탄 신주쿠 지하 식품관", description: "일본 최고급 백화점 이세탄 지하 1층의 화려한 식품관으로 일본 전국의 고급 식재료와 도시락을 판매합니다.", category: "food-market", estimatedDurationMinutes: 60, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/Isetan+Shinjuku+Depachika", detailedDescription: "데파치카(デパ地下) 문화의 정수로 화과자·와규·제철 과일 등 일본 식품 문화를 한눈에 볼 수 있습니다. 저녁 6시 이후 반값 할인 도시락을 노려보세요.", nearby: [{ name: "이세탄 이탈리안 레스토랑", type: "restaurant", description: "백화점 내 정통 이탈리안 다이닝" }] },
    { id: "tokyo-harajuku", name: "하라주쿠 다케시타 거리", description: "일본 팝 컬처와 스트리트 패션의 성지로 독특한 빈티지 숍과 크레이프 가게가 즐비한 골목입니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 90, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/Takeshita+Street+Harajuku+Tokyo", detailedDescription: "주말에는 코스프레와 로리타 패션을 한 젊은이들을 볼 수 있습니다. 350엔 크레이프와 면세 쇼핑으로 유명한 GU·포에버21도 인접해 있습니다.", nearby: [{ name: "마리온 크레이프", type: "cafe", description: "하라주쿠 대표 크레이프 전문점" }] },
    { id: "tokyo-ginza", name: "긴자", description: "도쿄의 명품 거리로 루이비통·샤넬 등 세계 최고급 브랜드와 화랑·레스토랑이 집결한 고급 상권입니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/Ginza+Tokyo+Shopping", detailedDescription: "긴자 식스(GINZA SIX)는 도쿄 최대 상업시설로 200개 이상의 브랜드가 입점해 있습니다. 매주 토·일요일 오후에는 일부 구간이 보행자 천국으로 운영됩니다.", nearby: [{ name: "규카츠 모토무라 긴자점", type: "restaurant", description: "규카츠(소고기 돈가스)의 원조 맛집" }] },
    { id: "tokyo-akihabara", name: "아키하바라", description: "세계 최대 전자·애니메이션·게임 상권으로 모든 일본 서브컬처가 집결된 유일무이한 거리입니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/Akihabara+Tokyo", detailedDescription: "요도바시 카메라와 같은 대형 가전 매장과 중고 피규어·게임 전문 점포가 공존합니다. 메이드 카페 체험과 게임 센터 탐방은 필수 코스입니다.", nearby: [{ name: "아키하바라 라디오 회관 카페", type: "cafe", description: "오타쿠 문화를 테마로 한 독특한 카페" }] },
  ],
  방콕: [
    { id: "bangkok-grand-palace", name: "왕궁 (그랜드 팰리스)", description: "태국 왕실의 역사와 정수가 담긴 곳으로 에메랄드 불상을 모신 왓 프라깨우가 경내에 있습니다.", category: "history-culture", estimatedDurationMinutes: 150, isFree: false, estimatedEntranceFee: "약 ₩13,000", recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Grand+Palace+Bangkok", detailedDescription: "1782년 라마 1세가 건립한 왕궁으로 태국 전통 건축의 극치를 보여줍니다. 반바지·민소매 착용 시 입장 불가이므로 긴바지 지참이 필수입니다.", nearby: [{ name: "크루아 압손", type: "restaurant", description: "왕궁 근처 태국 왕실 요리 전문 레스토랑" }] },
    { id: "bangkok-wat-pho", name: "왓 포 (와불 사원)", description: "46m 길이의 거대 황금 와불상으로 유명한 방콕 최대 사원이자 태국 전통 마사지 발상지입니다.", category: "history-culture", estimatedDurationMinutes: 90, isFree: false, estimatedEntranceFee: "약 ₩5,000", recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Wat+Pho+Bangkok", detailedDescription: "황금빛 와불상의 발바닥에 새겨진 108가지 상서로운 문양이 인상적입니다. 사원 내 마사지 센터에서 정통 타이 마사지를 받으며 피로를 풀 수 있습니다.", nearby: [{ name: "팟타이 통 레스토랑", type: "restaurant", description: "현지인에게 유명한 왓 포 인근 팟타이 전문점" }] },
    { id: "bangkok-wat-arun", name: "왓 아룬 (새벽 사원)", description: "차오프라야강 서안에 자리한 사원으로 도자기 조각으로 장식된 82m 높이의 중앙 탑이 독특합니다.", category: "history-culture", estimatedDurationMinutes: 60, isFree: false, estimatedEntranceFee: "약 ₩2,500", recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/Wat+Arun+Bangkok", detailedDescription: "일몰 무렵 강 건너편에서 바라보는 왓 아룬의 실루엣이 방콕 최고의 풍경 중 하나입니다. 페리를 타고 건너는 것이 정석 코스입니다.", nearby: [{ name: "더 덱 리버사이드", type: "restaurant", description: "왓 아룬 뷰를 감상하며 즐기는 리버사이드 레스토랑" }] },
    { id: "bangkok-lumphini", name: "룸피니 공원", description: "방콕 도심 한복판의 초록 오아시스로 새벽 태극권부터 저녁 조깅까지 현지인의 일상을 엿볼 수 있습니다.", category: "nature-relaxation", estimatedDurationMinutes: 90, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Lumpini+Park+Bangkok", detailedDescription: "2.5km 산책로와 노 젓기 보트, 야외 헬스장이 갖춰진 도심 공원입니다. 새벽에는 한국인 단체가 모여 태극권을 수련하는 진귀한 광경도 볼 수 있습니다.", nearby: [{ name: "벤자롱 레스토랑", type: "restaurant", description: "왕실풍 인테리어의 고급 태국 요리 전문점" }] },
    { id: "bangkok-chao-phraya", name: "차오프라야강 보트 투어", description: "방콕의 젖줄 차오프라야강을 따라 사원·왕궁·문화 유산을 뱃길로 유람하는 코스입니다.", category: "nature-relaxation", estimatedDurationMinutes: 120, isFree: false, estimatedEntranceFee: "약 ₩1,500", recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/Chao+Phraya+River+Cruise+Bangkok", detailedDescription: "오렌지 플래그 보트(15B)를 타면 왓 아룬, 왕궁 선착장, 카오산 로드 인근 선착장을 저렴하게 이동할 수 있습니다. 이른 저녁 선셋 크루즈도 인기입니다.", nearby: [{ name: "아시아티크 리버프런트", type: "restaurant", description: "강변 복합 쇼핑·다이닝 야외 시장" }] },
    { id: "bangkok-chatuchak", name: "짜뚜짝 주말 시장", description: "세계 최대 규모의 주말 시장으로 약 1만 5천 개 점포에서 의류·공예품·음식을 판매합니다.", category: "food-market", estimatedDurationMinutes: 180, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Chatuchak+Weekend+Market+Bangkok", detailedDescription: "토·일요일 오전 6시부터 오후 6시까지 운영합니다. 섹션별로 의류·골동품·반려동물·음식 구역이 나뉘어 있어 지도 앱 필수입니다.", nearby: [{ name: "짜뚜짝 코코넛 아이스크림", type: "cafe", description: "시장 내 인기 코코넛 아이스크림 노점" }] },
    { id: "bangkok-yaowarat", name: "야오와랏 차이나타운", description: "방콕 차이나타운으로 황금빛 간판과 노점 해산물 요리가 가득한 방콕 최고의 미식 거리입니다.", category: "food-market", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/Yaowarat+Chinatown+Bangkok", detailedDescription: "밤 10시까지 운영하는 해산물 노점과 제비집 음료, 딤섬 전문점이 줄지어 있습니다. 저녁 8시 이후가 가장 활기차며 팟씨이우, 로스트덕이 필수 메뉴입니다.", nearby: [{ name: "T&K 해산물", type: "restaurant", description: "미슐랭 빕 구르망 선정 야외 해산물 식당" }] },
    { id: "bangkok-or-tor-kor", name: "오토코 시장", description: "방콕 최고급 로컬 식품 시장으로 신선한 열대 과일과 즉석 조리 음식을 맛볼 수 있습니다.", category: "food-market", estimatedDurationMinutes: 60, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Or+Tor+Kor+Market+Bangkok", detailedDescription: "짜뚜짝 시장 바로 맞은편에 위치한 청결한 실내 시장입니다. 망고스틴, 두리안, 람부탄 등 제철 열대 과일을 시세보다 저렴하게 구매할 수 있습니다.", nearby: [{ name: "오토코 푸드코트", type: "restaurant", description: "에어컨 완비 로컬 음식 푸드코트" }] },
    { id: "bangkok-siam-paragon", name: "시암 파라곤", description: "방콕 최대의 럭셔리 쇼핑몰로 명품 브랜드·수족관·영화관이 한 건물에 집결해 있습니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 150, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/Siam+Paragon+Bangkok", detailedDescription: "지하에는 SEA LIFE 방콕 아쿠아리움이 있어 어린이 동반 가족에게 인기입니다. 최상층 영화관에서는 비즈니스석 수준의 좌석으로 영화를 즐길 수 있습니다.", nearby: [{ name: "푸드 파라다이스 B2F", type: "restaurant", description: "방콕 현지 음식부터 인터내셔널 요리까지 한 번에" }] },
    { id: "bangkok-asiatique", name: "아시아티크 리버프런트", description: "차오프라야강변에 자리한 야외 복합 쇼핑·엔터테인먼트 단지로 야시장과 공연이 매일 열립니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 150, isFree: true, recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/Asiatique+The+Riverfront+Bangkok", detailedDescription: "매일 저녁 5시부터 자정까지 운영하며 창고를 개조한 독특한 분위기가 인상적입니다. 캘리도스코프 무에타이 쇼와 조셉 안나 마리오넷 인형극 공연도 볼 수 있습니다.", nearby: [{ name: "아시아티크 씨푸드", type: "restaurant", description: "강변 뷰의 신선한 해산물 바비큐 레스토랑" }] },
    { id: "bangkok-pratunam", name: "프라투남 의류 시장", description: "방콕 최대 도매·소매 의류 시장으로 저렴한 가격에 최신 트렌드 의류를 구매할 수 있습니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/Pratunam+Market+Bangkok", detailedDescription: "팔라듐·빅씨 인근에 위치한 미로 같은 시장으로 새벽부터 도매 상인들이 활동합니다. 흥정이 일반적이며 3개 이상 구매 시 할인을 요청할 수 있습니다.", nearby: [{ name: "센트럴 월드 푸드코트", type: "restaurant", description: "대형 쇼핑몰 내 다양한 태국·인터내셔널 음식" }] },
    { id: "bangkok-khao-san", name: "카오산 로드", description: "전 세계 배낭여행자의 성지로 저렴한 숙소·음식·마사지숍이 밀집한 방콕의 자유여행 허브입니다.", category: "nature-relaxation", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/Khao+San+Road+Bangkok", detailedDescription: "저녁이 되면 거리 전체가 야외 클럽으로 변신합니다. 1달러 팟타이부터 생맥주, 발 마사지까지 모든 것을 이 골목 하나에서 해결할 수 있습니다.", nearby: [{ name: "라이브 뮤직 바", type: "cafe", description: "카오산 로드 생맥주와 라이브 공연" }] },
  ],
};

const MOCK_DEFAULT: Attraction[] = [
  { id: "default-landmark", name: "도심 대표 랜드마크", description: "도시를 상징하는 역사적 건축물로 지역 문화와 역사를 한눈에 볼 수 있습니다.", category: "history-culture", estimatedDurationMinutes: 90, isFree: false, estimatedEntranceFee: "약 ₩10,000", recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/landmark", detailedDescription: "도시의 역사를 대표하는 랜드마크입니다. 가이드 투어를 이용하면 더욱 풍부한 설명을 들을 수 있습니다.", nearby: [{ name: "인근 카페", type: "cafe", description: "랜드마크 인근 인기 카페" }] },
  { id: "default-museum", name: "국립 박물관", description: "국가 역사와 문화 유산을 전시하는 대표 박물관입니다.", category: "history-culture", estimatedDurationMinutes: 120, isFree: false, estimatedEntranceFee: "약 ₩8,000", recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/national+museum", detailedDescription: "상설 전시와 기획 전시로 다양한 문화 컬렉션을 감상할 수 있습니다.", nearby: [{ name: "박물관 레스토랑", type: "restaurant", description: "박물관 내 현지 음식 레스토랑" }] },
  { id: "default-park", name: "도심 공원", description: "현지인이 즐겨 찾는 도심 속 자연 휴식 공간입니다.", category: "nature-relaxation", estimatedDurationMinutes: 90, isFree: true, recommendedTimeOfDay: "morning", googleMapsUrl: "https://www.google.com/maps/search/city+park", detailedDescription: "산책과 조깅을 즐기기 좋은 넓은 공원입니다.", nearby: [{ name: "공원 카페", type: "cafe", description: "공원 내 음료 및 간식 카페" }] },
  { id: "default-beach", name: "해변·자연 명소", description: "현지 자연을 대표하는 아름다운 명소입니다.", category: "nature-relaxation", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/nature+attraction", detailedDescription: "계절에 따라 다양한 자연 경관을 감상할 수 있습니다.", nearby: [{ name: "해변 레스토랑", type: "restaurant", description: "신선한 해산물 전문 레스토랑" }] },
  { id: "default-market", name: "전통 시장·야시장", description: "현지인의 일상과 음식 문화를 가까이서 체험할 수 있는 전통 시장입니다.", category: "food-market", estimatedDurationMinutes: 90, isFree: true, recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/local+market", detailedDescription: "다양한 현지 음식과 특산품을 만날 수 있습니다.", nearby: [{ name: "시장 내 노점", type: "restaurant", description: "저렴한 현지 길거리 음식" }] },
  { id: "default-foodstreet", name: "미식 거리", description: "현지 인기 맛집과 음식 노점이 밀집한 대표 미식 골목입니다.", category: "food-market", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "evening", googleMapsUrl: "https://www.google.com/maps/search/food+street", detailedDescription: "현지 인기 음식을 한 번에 맛볼 수 있는 미식 거리입니다.", nearby: [{ name: "대표 맛집", type: "restaurant", description: "현지인이 줄 서는 맛집" }] },
  { id: "default-shopping", name: "쇼핑 거리", description: "현지 트렌드와 글로벌 브랜드가 공존하는 메인 쇼핑 구역입니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 120, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/shopping+district", detailedDescription: "면세 쇼핑과 현지 디자이너 브랜드를 한 곳에서 만날 수 있습니다.", nearby: [{ name: "쇼핑몰 푸드코트", type: "restaurant", description: "다양한 음식을 즐길 수 있는 푸드코트" }] },
  { id: "default-mall", name: "대형 복합 쇼핑몰", description: "쇼핑·영화·식사를 한 번에 해결할 수 있는 도심 대형 복합 쇼핑몰입니다.", category: "shopping-lifestyle", estimatedDurationMinutes: 150, isFree: true, recommendedTimeOfDay: "afternoon", googleMapsUrl: "https://www.google.com/maps/search/shopping+mall", detailedDescription: "에어컨이 잘 갖춰진 복합 공간으로 더운 날씨에도 쾌적하게 쇼핑을 즐길 수 있습니다.", nearby: [{ name: "몰 내 레스토랑", type: "restaurant", description: "다양한 인터내셔널 레스토랑" }] },
];

function getMockAttractions(city: string): Attraction[] {
  return MOCK_ATTRACTIONS[city] ?? MOCK_DEFAULT;
}

function buildPrompt(city: string, cityEn: string): string {
  return `You are a travel expert. Return a JSON array of exactly 12 must-visit attractions in ${cityEn} (${city}), 3 per category.

Categories:
- "history-culture": historic sites, temples, palaces, museums
- "nature-relaxation": parks, beaches, mountains, gardens
- "food-market": famous food streets, night markets, local restaurants, markets
- "shopping-lifestyle": shopping districts, malls, lifestyle spots

Return ONLY a valid JSON array with this exact structure per item:
{
  "id": "kebab-case-unique-id",
  "name": "한국어 이름",
  "description": "1-2문장 한국어 설명",
  "category": "history-culture",
  "estimatedDurationMinutes": 90,
  "isFree": false,
  "estimatedEntranceFee": "약 ₩15,000",
  "recommendedTimeOfDay": "morning",
  "googleMapsUrl": "https://www.google.com/maps/search/${encodeURIComponent(cityEn)}+attraction+name",
  "detailedDescription": "2-3문장 상세 설명 및 방문 팁",
  "nearby": [
    { "name": "근처 가게 이름", "type": "restaurant", "description": "한 줄 설명" }
  ]
}

Rules:
- Only include real, well-known places
- isFree: true → omit estimatedEntranceFee
- recommendedTimeOfDay: "morning" | "afternoon" | "evening" | "anytime"
- googleMapsUrl must use real place name in the search query
- Return ONLY the JSON array, no markdown, no explanation`;
}

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city");
  const cityEn = req.nextUrl.searchParams.get("cityEn") ?? city ?? "";

  if (!city) {
    return NextResponse.json({ error: "city 파라미터가 필요합니다." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API 키가 없습니다." }, { status: 500 });
  }

  try {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(city, cityEn) }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!res.ok) {
      console.warn(`Gemini API ${res.status} — falling back to mock data`);
      return NextResponse.json(getMockAttractions(city));
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!raw) {
      return NextResponse.json(getMockAttractions(city));
    }

    let attractions: Attraction[];
    try {
      attractions = JSON.parse(raw);
    } catch {
      const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
      attractions = match ? JSON.parse(match[1].trim()) : getMockAttractions(city);
    }

    if (!Array.isArray(attractions) || attractions.length === 0) {
      return NextResponse.json(getMockAttractions(city));
    }

    return NextResponse.json(attractions);
  } catch (err) {
    console.warn("Places route error — falling back to mock:", err);
    return NextResponse.json(getMockAttractions(city));
  }
}
