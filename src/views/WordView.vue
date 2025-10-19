<script setup>
import { onMounted, ref } from 'vue'; // computedもインポート
import db from '@/assets/indexeddb';
//一覧初期値
const initialWordsData = ref([
    { "no": 1, "word": "order", "meishi": "注文・命令", "doushi": "～を注文する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 2, "word": "meeting", "meishi": "会議", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 3, "word": "service", "meishi": "サービス", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 4, "word": "employee", "meishi": "従業員", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 5, "word": "department", "meishi": "部署", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 6, "word": "ask", "meishi": "", "doushi": "～を頼む・～を訪ねる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 7, "word": "available", "meishi": "", "doushi": "", "keiyoushi": "利用できる・手に入る", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 8, "word": "customer", "meishi": "顧客", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 9, "word": "place", "meishi": "場所", "doushi": "～を置く", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 10, "word": "travel", "meishi": "旅行", "doushi": "旅行する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 11, "word": "purchase", "meishi": "購入・購入品", "doushi": "～を購入する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 12, "word": "training", "meishi": "トレーニング・研修", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 13, "word": "need", "meishi": "必要性", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 14, "word": "book", "meishi": "本", "doushi": "～を予約する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 15, "word": "conference", "meishi": "会議", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 16, "word": "schedule", "meishi": "予定", "doushi": "～を予定する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 17, "word": "staff", "meishi": "社員・スタッフ", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 18, "word": "report", "meishi": "報告書", "doushi": "出勤する・報告する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 19, "word": "contact", "meishi": "連絡", "doushi": "～に連絡をする", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 20, "word": "likely", "meishi": "", "doushi": "", "keiyoushi": "ありそうな", "fukushi": "おそらく", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 21, "word": "local", "meishi": "", "doushi": "", "keiyoushi": "地元の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 22, "word": "offer", "meishi": "申し出", "doushi": "～を提供する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 23, "word": "clerk", "meishi": "店員", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 24, "word": "purpose", "meishi": "目標", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 25, "word": "product", "meishi": "製品", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 26, "word": "project", "meishi": "計画", "doushi": "～を計画する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 27, "word": "request", "meishi": "要求", "doushi": "～を要求する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 28, "word": "form", "meishi": "用紙", "doushi": "～を形作る", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 29, "word": "manager", "meishi": "部長・マネージャー", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 30, "word": "also", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～もまた", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 31, "word": "library", "meishi": "図書館", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 32, "word": "open", "meishi": "", "doushi": "～を開ける", "keiyoushi": "開いている", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 33, "word": "problem", "meishi": "問題", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 34, "word": "photocopier", "meishi": "コピー機", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 35, "word": "review", "meishi": "批評・再検討", "doushi": "～を見直す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 36, "word": "each", "meishi": "", "doushi": "", "keiyoushi": "それぞれの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 37, "word": "return", "meishi": "返却", "doushi": "戻る・～を返す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 38, "word": "location", "meishi": "場所・店舗", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 39, "word": "receive", "meishi": "", "doushi": "～を受け取る", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 40, "word": "research", "meishi": "研究", "doushi": "～を研究する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 41, "word": "check", "meishi": "", "doushi": "～をチェックする", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 42, "word": "during", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～の間", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 43, "word": "provide", "meishi": "", "doushi": "～を提供する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 44, "word": "several", "meishi": "", "doushi": "", "keiyoushi": "いくつかの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 45, "word": "subject", "meishi": "件名・科目", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 46, "word": "advertisement", "meishi": "広告", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 47, "word": "article", "meishi": "記事", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 48, "word": "because", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "なぜなら", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 49, "word": "income", "meishi": "収入", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 50, "word": "appointment", "meishi": "約束・予約", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 51, "word": "resume", "meishi": "履歴書", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 52, "word": "discount", "meishi": "割引", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 53, "word": "special", "meishi": "", "doushi": "", "keiyoushi": "特別な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 54, "word": "tour", "meishi": "ツアー・見学", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 55, "word": "furniture", "meishi": "家具", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 56, "word": "save", "meishi": "", "doushi": "～を節約する・～を保存する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 57, "word": "list", "meishi": "リスト・一覧", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 58, "word": "sure", "meishi": "", "doushi": "", "keiyoushi": "確かな", "fukushi": "確かに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 59, "word": "visit", "meishi": "訪問", "doushi": "～を訪問する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 60, "word": "remark", "meishi": "発言・意見", "doushi": "～と述べる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 61, "word": "recently", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "最近", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 62, "word": "right", "meishi": "権利・正しいこと", "doushi": "", "keiyoushi": "正しい", "fukushi": "正しく・すぐに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 63, "word": "soon", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "すぐに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 64, "word": "able", "meishi": "", "doushi": "", "keiyoushi": "～できる", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 65, "word": "already", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "すでに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 66, "word": "delivery", "meishi": "配達", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 67, "word": "different", "meishi": "", "doushi": "", "keiyoushi": "異なる", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 68, "word": "director", "meishi": "部長・役員", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 69, "word": "equipment", "meishi": "設備", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 70, "word": "few", "meishi": "", "doushi": "", "keiyoushi": "少ない", "fukushi": "少し", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 71, "word": "find", "meishi": "", "doushi": "～を見つける", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 72, "word": "near", "meishi": "", "doushi": "", "keiyoushi": "近い", "fukushi": "近く", "zentishi": "～の近く", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 73, "word": "since", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "以来", "zentishi": "～以来", "setuzokushi": "～なので", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 74, "word": "early", "meishi": "", "doushi": "", "keiyoushi": "早い", "fukushi": "早く", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 75, "word": "until", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～まで", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 76, "word": "attend", "meishi": "", "doushi": "～に出席する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 77, "word": "complete", "meishi": "", "doushi": "～を完了する", "keiyoushi": "完全な", "fukushi": "完全に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 78, "word": "president", "meishi": "社長", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 79, "word": "experience", "meishi": "経験", "doushi": "～を経験する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 80, "word": "price", "meishi": "価格", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 81, "word": "welcome", "meishi": "歓迎", "doushi": "～を歓迎する", "keiyoushi": "歓迎の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 82, "word": "design", "meishi": "デザイン・設計", "doushi": "～をデザインする・～を設計する", "keiyoushi": "デザインの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 83, "word": "marketing", "meishi": "マーケティング", "doushi": "", "keiyoushi": "マーケティングの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 84, "word": "policy", "meishi": "政策・方針", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 85, "word": "account", "meishi": "口座・勘定", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 86, "word": "award", "meishi": "賞", "doushi": "～を授与する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 87, "word": "flight", "meishi": "フライト・便", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 88, "word": "through", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～を通して", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 89, "word": "charge", "meishi": "料金・請求", "doushi": "～を請求する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 90, "word": "construction", "meishi": "建設", "doushi": "", "keiyoushi": "建設の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 91, "word": "performance", "meishi": "実績・性能", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 92, "word": "position", "meishi": "職位・位置", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 93, "word": "repair", "meishi": "修理", "doushi": "～を修理する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 94, "word": "announce", "meishi": "", "doushi": "～を発表する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 95, "word": "plan", "meishi": "計画", "doushi": "～を計画する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 96, "word": "arrive", "meishi": "", "doushi": "到着する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 97, "word": "budget", "meishi": "予算", "doushi": "", "keiyoushi": "予算の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 98, "word": "end", "meishi": "終わり", "doushi": "終わる", "keiyoushi": "終わりの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 99, "word": "quantity", "meishi": "量", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 100, "word": "contract", "meishi": "契約", "doushi": "～と契約する", "keiyoushi": "契約の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 101, "word": "include", "meishi": "", "doushi": "～を含む", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 102, "word": "survey", "meishi": "調査", "doushi": "～を調査する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 103, "word": "trip", "meishi": "旅行", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 104, "word": "merchandise", "meishi": "商品", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 105, "word": "shipping", "meishi": "配送", "doushi": "", "keiyoushi": "配送の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 106, "word": "earn", "meishi": "", "doushi": "～を稼ぐ", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 107, "word": "additional", "meishi": "", "doushi": "", "keiyoushi": "追加の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 108, "word": "another", "meishi": "", "doushi": "", "keiyoushi": "もう一つの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 109, "word": "possible", "meishi": "", "doushi": "", "keiyoushi": "可能な", "fukushi": "おそらく", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 110, "word": "proposal", "meishi": "提案", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 111, "word": "public", "meishi": "", "doushi": "", "keiyoushi": "公の", "fukushi": "公に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 112, "word": "still", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "まだ", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 113, "word": "submit", "meishi": "", "doushi": "～を提出する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 114, "word": "such", "meishi": "", "doushi": "", "keiyoushi": "そのような", "fukushi": "そのように", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 115, "word": "move", "meishi": "移動・引っ越し", "doushi": "移動する・～を動かす", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 116, "word": "really", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "本当に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 117, "word": "whole", "meishi": "", "doushi": "", "keiyoushi": "全体の", "fukushi": "まるごと", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 118, "word": "sincerely", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "敬具", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 119, "word": "cost", "meishi": "費用", "doushi": "～がかかる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 120, "word": "present", "meishi": "現在・贈り物", "doushi": "～を贈る・出席する", "keiyoushi": "現在の", "fukushi": "現在", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 121, "word": "hurry", "meishi": "急ぎ", "doushi": "急ぐ", "keiyoushi": "", "fukushi": "急いで", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 122, "word": "within", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～以内に", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 123, "word": "bring", "meishi": "", "doushi": "～を持ってくる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 124, "word": "fee", "meishi": "料金", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 125, "word": "notice", "meishi": "お知らせ・注意", "doushi": "～に気づく", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 126, "word": "sign", "meishi": "サイン・標識", "doushi": "～に署名する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 127, "word": "suggest", "meishi": "", "doushi": "～を提案する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 128, "word": "while", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "その間", "zentishi": "", "setuzokushi": "～の間", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 129, "word": "yet", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "まだ・しかし", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 130, "word": "probably", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "おそらく", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 131, "word": "close", "meishi": "", "doushi": "～を閉める", "keiyoushi": "近い", "fukushi": "近く", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 132, "word": "discuss", "meishi": "", "doushi": "～について話し合う", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 133, "word": "opinion", "meishi": "意見", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 134, "word": "interview", "meishi": "面接", "doushi": "～に面接する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 135, "word": "maintenance", "meishi": "メンテナンス", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 136, "word": "mention", "meishi": "", "doushi": "～に言及する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 137, "word": "address", "meishi": "住所・演説", "doushi": "～に話しかける・～に対処する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 138, "word": "found", "meishi": "", "doushi": "～を見つけた", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 139, "word": "however", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "しかし", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 140, "word": "increase", "meishi": "増加", "doushi": "増加する・～を増やす", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 141, "word": "later", "meishi": "", "doushi": "", "keiyoushi": "後で", "fukushi": "後で", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 142, "word": "series", "meishi": "シリーズ", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 143, "word": "transportation", "meishi": "交通手段", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 144, "word": "annual", "meishi": "", "doushi": "", "keiyoushi": "年間の", "fukushi": "毎年", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 145, "word": "application", "meishi": "応募・申請・アプリ", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 146, "word": "detail", "meishi": "詳細", "doushi": "", "keiyoushi": "詳細な", "fukushi": "詳しく", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 147, "word": "passenger", "meishi": "乗客", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 148, "word": "supervisor", "meishi": "上司・監督者", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 149, "word": "access", "meishi": "アクセス・利用", "doushi": "～にアクセスする", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 150, "word": "decide", "meishi": "", "doushi": "～を決定する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 151, "word": "financial", "meishi": "", "doushi": "", "keiyoushi": "財政的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 152, "word": "forward", "meishi": "", "doushi": "", "keiyoushi": "前方の", "fukushi": "前へ", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 153, "word": "concern", "meishi": "心配・懸念", "doushi": "～を心配させる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 154, "word": "popular", "meishi": "", "doushi": "", "keiyoushi": "人気のある", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 155, "word": "presentation", "meishi": "プレゼンテーション", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 156, "word": "qualification", "meishi": "資格", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 157, "word": "recommend", "meishi": "", "doushi": "～を推薦する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 158, "word": "reservation", "meishi": "予約", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 159, "word": "garden", "meishi": "庭", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 160, "word": "hire", "meishi": "採用", "doushi": "～を採用する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 161, "word": "please", "meishi": "", "doushi": "～を喜ばせる", "keiyoushi": "", "fukushi": "どうか", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 162, "word": "resource", "meishi": "資源", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 163, "word": "workshop", "meishi": "ワークショップ", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 164, "word": "both", "meishi": "", "doushi": "", "keiyoushi": "両方の", "fukushi": "両方とも", "zentishi": "", "setuzokushi": "～と～", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 165, "word": "community", "meishi": "地域社会", "doushi": "", "keiyoushi": "地域社会の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 166, "word": "confirm", "meishi": "", "doushi": "～を確認する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 167, "word": "due", "meishi": "締め切り", "doushi": "", "keiyoushi": "期限が来た", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 168, "word": "facility", "meishi": "施設", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 169, "word": "fulfill", "meishi": "", "doushi": "～を満たす", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 170, "word": "interest", "meishi": "興味・利子", "doushi": "～に興味を持たせる", "keiyoushi": "興味深い", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 171, "word": "laboratory", "meishi": "研究所", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 172, "word": "own", "meishi": "自分自身の", "doushi": "～を所有する", "keiyoushi": "自分自身の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 173, "word": "previous", "meishi": "", "doushi": "", "keiyoushi": "前の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 174, "word": "promptly", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "迅速に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 175, "word": "resident", "meishi": "居住者", "doushi": "", "keiyoushi": "居住している", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 176, "word": "security", "meishi": "安全・警備", "doushi": "", "keiyoushi": "安全な", "fukushi": "安全に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 177, "word": "vehicle", "meishi": "車両", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 178, "word": "board", "meishi": "委員会・掲示板", "doushi": "～に乗る", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 179, "word": "career", "meishi": "職業・経歴", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 180, "word": "clothing", "meishi": "衣類", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 181, "word": "credit", "meishi": "信用・クレジット", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 182, "word": "describe", "meishi": "", "doushi": "～を説明する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 183, "word": "focus", "meishi": "焦点", "doushi": "～に焦点を当てる", "keiyoushi": "焦点の合った", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 184, "word": "identification", "meishi": "身分証明", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 185, "word": "international", "meishi": "", "doushi": "", "keiyoushi": "国際的な", "fukushi": "国際的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 186, "word": "revise", "meishi": "", "doushi": "～を修正する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 187, "word": "register", "meishi": "登録簿", "doushi": "～を登録する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 188, "word": "upcoming", "meishi": "", "doushi": "", "keiyoushi": "今後の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 189, "word": "update", "meishi": "最新情報", "doushi": "～を更新する", "keiyoushi": "最新の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 190, "word": "approximately", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "おおよそ", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 191, "word": "currently", "meishi": "", "doushi": "", "keiyoushi": "現在の", "fukushi": "現在", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 192, "word": "crowded", "meishi": "", "doushi": "", "keiyoushi": "混雑した", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 193, "word": "safety", "meishi": "安全", "doushi": "", "keiyoushi": "安全な", "fukushi": "安全に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 194, "word": "selection", "meishi": "選択", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 195, "word": "bulletin", "meishi": "掲示", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 196, "word": "feature", "meishi": "特徴", "doushi": "～を特徴づける", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 197, "word": "instrument", "meishi": "器具・楽器", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 198, "word": "join", "meishi": "", "doushi": "～に参加する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 199, "word": "leave", "meishi": "休暇・出発", "doushi": "～を去る・～を残す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 200, "word": "plant", "meishi": "植物・工場", "doushi": "～を植える", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 201, "word": "require", "meishi": "", "doushi": "～を必要とする", "keiyoushi": "必須の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 202, "word": "short", "meishi": "", "doushi": "", "keiyoushi": "短い", "fukushi": "短く", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 203, "word": "tell", "meishi": "", "doushi": "～に話す・～を伝える", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 204, "word": "campaign", "meishi": "キャンペーン", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 205, "word": "collection", "meishi": "コレクション・収集", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 206, "word": "document", "meishi": "書類", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 207, "word": "expect", "meishi": "", "doushi": "～を期待する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 208, "word": "least", "meishi": "", "doushi": "", "keiyoushi": "最小の", "fukushi": "少なくとも", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 209, "word": "membership", "meishi": "会員資格", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 210, "word": "publish", "meishi": "", "doushi": "～を出版する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 211, "word": "rent", "meishi": "賃貸料", "doushi": "～を賃借りする", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 212, "word": "voucher", "meishi": "引換券", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 213, "word": "actually", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "実際に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 214, "word": "arrange", "meishi": "", "doushi": "～を手配する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 215, "word": "care", "meishi": "注意・世話", "doushi": "～を気にする・世話をする", "keiyoushi": "注意深い", "fukushi": "注意深く", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 216, "word": "create", "meishi": "", "doushi": "～を創造する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 217, "word": "explain", "meishi": "", "doushi": "～を説明する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 218, "word": "field", "meishi": "分野・畑", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 219, "word": "deadline", "meishi": "締め切り", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 220, "word": "important", "meishi": "", "doushi": "", "keiyoushi": "重要な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 221, "word": "once", "meishi": "", "doushi": "", "keiyoushi": "一度", "fukushi": "一度", "zentishi": "", "setuzokushi": "いったん～すると", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 222, "word": "pay", "meishi": "給料・支払い", "doushi": "～を支払う", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 223, "word": "quite", "meishi": "", "doushi": "", "keiyoushi": "かなり", "fukushi": "かなり", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 224, "word": "opposite", "meishi": "", "doushi": "", "keiyoushi": "反対の", "fukushi": "反対に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 225, "word": "though", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "～だけれども", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 226, "word": "along", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～に沿って", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 227, "word": "assist", "meishi": "", "doushi": "～を助ける", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 228, "word": "based", "meishi": "", "doushi": "", "keiyoushi": "～に基づいた", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 229, "word": "between", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～の間に", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 230, "word": "beverage", "meishi": "飲料", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 231, "word": "enough", "meishi": "", "doushi": "", "keiyoushi": "十分な", "fukushi": "十分に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 232, "word": "extra", "meishi": "", "doushi": "", "keiyoushi": "余分な", "fukushi": "余分に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 233, "word": "guide", "meishi": "ガイド・案内書", "doushi": "～を案内する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 234, "word": "introduce", "meishi": "", "doushi": "～を紹介する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 235, "word": "investment", "meishi": "投資", "doushi": "～を投資する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 236, "word": "issue", "meishi": "問題・発行", "doushi": "～を発行する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 237, "word": "limited", "meishi": "", "doushi": "", "keiyoushi": "限られた", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 238, "word": "pick", "meishi": "", "doushi": "～を選ぶ・拾う", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 239, "word": "prepare", "meishi": "", "doushi": "～を準備する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 240, "word": "ready", "meishi": "", "doushi": "", "keiyoushi": "用意ができた", "fukushi": "準備ができて", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 241, "word": "replace", "meishi": "", "doushi": "～を取り替える", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 242, "word": "together", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "一緒に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 243, "word": "variety", "meishi": "多様性", "doushi": "", "keiyoushi": "さまざまな", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 244, "word": "warranty", "meishi": "保証", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 245, "word": "attach", "meishi": "", "doushi": "～を添付する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 246, "word": "furthermore", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "さらに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 247, "word": "exhibit", "meishi": "展示品", "doushi": "～を展示する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 248, "word": "finish", "meishi": "終わり", "doushi": "～を終える", "keiyoushi": "終わりの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 249, "word": "fuel", "meishi": "燃料", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 250, "word": "install", "meishi": "", "doushi": "～を設置する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 251, "word": "medical", "meishi": "", "doushi": "", "keiyoushi": "医療の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 252, "word": "opportunity", "meishi": "機会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 253, "word": "past", "meishi": "過去", "doushi": "", "keiyoushi": "過去の", "fukushi": "過去に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 254, "word": "profit", "meishi": "利益", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 255, "word": "process", "meishi": "過程・処理", "doushi": "～を処理する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 256, "word": "promote", "meishi": "", "doushi": "～を昇進させる・～を促進する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 257, "word": "celebration", "meishi": "お祝い", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 258, "word": "choose", "meishi": "", "doushi": "～を選ぶ", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 259, "word": "code", "meishi": "コード・符号", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 260, "word": "corporate", "meishi": "", "doushi": "", "keiyoushi": "企業の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 261, "word": "delay", "meishi": "遅延", "doushi": "～を遅らせる", "keiyoushi": "遅れた", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 262, "word": "display", "meishi": "展示・表示", "doushi": "～を展示する・表示する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 263, "word": "ensure", "meishi": "", "doushi": "～を保証する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 264, "word": "excellent", "meishi": "", "doushi": "", "keiyoushi": "素晴らしい", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 265, "word": "expense", "meishi": "費用", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 266, "word": "express", "meishi": "急行", "doushi": "～を表現する", "keiyoushi": "急行の", "fukushi": "急いで", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 267, "word": "factory", "meishi": "工場", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 268, "word": "firm", "meishi": "会社", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 269, "word": "idea", "meishi": "アイデア", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 270, "word": "immediately", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "すぐに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 271, "word": "latest", "meishi": "", "doushi": "", "keiyoushi": "最新の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 272, "word": "mainly", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "主に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 273, "word": "matter", "meishi": "問題・事柄", "doushi": "～は重要である", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 274, "word": "monthly", "meishi": "", "doushi": "", "keiyoushi": "月々の", "fukushi": "毎月", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 275, "word": "obtain", "meishi": "", "doushi": "～を得る", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 276, "word": "personnel", "meishi": "人事", "doushi": "", "keiyoushi": "人事の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 277, "word": "rate", "meishi": "割合・料金", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 278, "word": "stock", "meishi": "在庫・株", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 279, "word": "supply", "meishi": "供給", "doushi": "～を供給する", "keiyoushi": "供給の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 280, "word": "suppose", "meishi": "", "doushi": "～だと思う", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 281, "word": "traffic", "meishi": "交通", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 282, "word": "accurate", "meishi": "", "doushi": "", "keiyoushi": "正確な", "fukushi": "正確に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 283, "word": "across", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～を横切って", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 284, "word": "agent", "meishi": "代理人", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 285, "word": "always", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "いつも", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 286, "word": "failure", "meishi": "失敗", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 287, "word": "easily", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "簡単に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 288, "word": "occur", "meishi": "", "doushi": "起こる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 289, "word": "regular", "meishi": "", "doushi": "", "keiyoushi": "定期的な", "fukushi": "定期的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 290, "word": "remind", "meishi": "", "doushi": "～に思い出させる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 291, "word": "representative", "meishi": "代表者", "doushi": "", "keiyoushi": "代表的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 292, "word": "successful", "meishi": "", "doushi": "", "keiyoushi": "成功した", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 293, "word": "under", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～の下に", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 294, "word": "according", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～によれば", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 295, "word": "committee", "meishi": "委員会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 296, "word": "consider", "meishi": "", "doushi": "～を考慮する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 297, "word": "damage", "meishi": "損害", "doushi": "～に損害を与える", "keiyoushi": "損害の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 298, "word": "blame", "meishi": "非難", "doushi": "～を非難する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 299, "word": "development", "meishi": "開発・発展", "doushi": "", "keiyoushi": "開発の・発展の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 300, "word": "effective", "meishi": "", "doushi": "", "keiyoushi": "効果的な", "fukushi": "効果的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 301, "word": "postpone", "meishi": "", "doushi": "～を延期する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 302, "word": "information", "meishi": "情報", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 303, "word": "participate", "meishi": "", "doushi": "～に参加する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 304, "word": "prefer", "meishi": "", "doushi": "～を好む", "keiyoushi": "好みの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 305, "word": "professional", "meishi": "", "doushi": "", "keiyoushi": "専門的な", "fukushi": "専門的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 306, "word": "property", "meishi": "不動産・財産", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 307, "word": "rather", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "むしろ", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 308, "word": "reception", "meishi": "受付・歓迎会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 309, "word": "remain", "meishi": "", "doushi": "残る", "keiyoushi": "残りの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 310, "word": "written", "meishi": "", "doushi": "", "keiyoushi": "書かれた", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 311, "word": "wrong", "meishi": "", "doushi": "", "keiyoushi": "間違った", "fukushi": "間違って", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 312, "word": "accept", "meishi": "", "doushi": "～を受け入れる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 313, "word": "advice", "meishi": "助言", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 314, "word": "banquet", "meishi": "宴会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 315, "word": "colleague", "meishi": "同僚", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 316, "word": "convenient", "meishi": "", "doushi": "", "keiyoushi": "便利な", "fukushi": "便利に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 317, "word": "convention", "meishi": "会議・集会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 318, "word": "fine", "meishi": "罰金", "doushi": "", "keiyoushi": "素晴らしい・元気な", "fukushi": "元気に・細かく", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 319, "word": "follow", "meishi": "", "doushi": "～に従う", "keiyoushi": "次の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 320, "word": "highly", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "非常に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 321, "word": "industry", "meishi": "産業", "doushi": "", "keiyoushi": "産業の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 322, "word": "instead", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "代わりに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 323, "word": "instruction", "meishi": "指示", "doushi": "", "keiyoushi": "指示の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 324, "word": "major", "meishi": "", "doushi": "", "keiyoushi": "主要な", "fukushi": "主に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 325, "word": "manual", "meishi": "手引書", "doushi": "", "keiyoushi": "手動の", "fukushi": "手動で", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 326, "word": "manufacturing", "meishi": "製造業", "doushi": "", "keiyoushi": "製造の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 327, "word": "personal", "meishi": "", "doushi": "", "keiyoushi": "個人的な", "fukushi": "個人的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 328, "word": "praise", "meishi": "称賛", "doushi": "～を称賛する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 329, "word": "press", "meishi": "報道・出版", "doushi": "～を押す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 330, "word": "remove", "meishi": "", "doushi": "～を取り除く", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 331, "word": "retirement", "meishi": "退職", "doushi": "", "keiyoushi": "退職の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 332, "word": "throughout", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～の間中", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 333, "word": "usually", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "たいてい", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 334, "word": "answer", "meishi": "答え", "doushi": "～に答える", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 335, "word": "attention", "meishi": "注意", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 336, "word": "briefly", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "簡潔に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 337, "word": "cancel", "meishi": "", "doushi": "～をキャンセルする", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 338, "word": "ignore", "meishi": "", "doushi": "～を無視する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 339, "word": "feedback", "meishi": "フィードバック", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 340, "word": "guideline", "meishi": "指針", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 341, "word": "organize", "meishi": "", "doushi": "～を組織する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 342, "word": "outstanding", "meishi": "", "doushi": "", "keiyoushi": "傑出した", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 343, "word": "recognition", "meishi": "認識・表彰", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 344, "word": "run", "meishi": "経営・走行", "doushi": "走る・～を経営する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 345, "word": "shelf", "meishi": "棚", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 346, "word": "specific", "meishi": "", "doushi": "", "keiyoushi": "特定の", "fukushi": "具体的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 347, "word": "standard", "meishi": "基準", "doushi": "", "keiyoushi": "標準的な", "fukushi": "標準的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 348, "word": "state", "meishi": "状態・州", "doushi": "～を述べる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 349, "word": "storage", "meishi": "保管・貯蔵", "doushi": "", "keiyoushi": "保管の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 350, "word": "temporary", "meishi": "", "doushi": "", "keiyoushi": "一時的な", "fukushi": "一時的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 351, "word": "appreciate", "meishi": "", "doushi": "～に感謝する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 352, "word": "associate", "meishi": "関係者・同僚", "doushi": "～を関連付ける", "keiyoushi": "関連した", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 353, "word": "audience", "meishi": "聴衆", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 354, "word": "brochure", "meishi": "パンフレット", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 355, "word": "candidate", "meishi": "候補者", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 356, "word": "despite", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～にもかかわらず", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 357, "word": "enclosed", "meishi": "", "doushi": "", "keiyoushi": "同封された", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 358, "word": "executive", "meishi": "幹部", "doushi": "", "keiyoushi": "幹部の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 359, "word": "figure", "meishi": "数字・図", "doushi": "～を理解する・～を計算する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 360, "word": "filing", "meishi": "書類整理", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 361, "word": "final", "meishi": "", "doushi": "", "keiyoushi": "最終的な", "fukushi": "最終的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 362, "word": "healthcare", "meishi": "医療", "doushi": "", "keiyoushi": "医療の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 363, "word": "innovative", "meishi": "", "doushi": "", "keiyoushi": "革新的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 364, "word": "intend", "meishi": "", "doushi": "～を意図する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 365, "word": "invite", "meishi": "", "doushi": "～を招待する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 366, "word": "necessary", "meishi": "", "doushi": "", "keiyoushi": "必要な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 367, "word": "platform", "meishi": "プラットフォーム", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 368, "word": "practice", "meishi": "練習・慣習", "doushi": "～を練習する", "keiyoushi": "実践的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 369, "word": "reason", "meishi": "理由", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 370, "word": "skill", "meishi": "技術・技能", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 371, "word": "tool", "meishi": "道具", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 372, "word": "trade", "meishi": "貿易・取引", "doushi": "～を取引する", "keiyoushi": "貿易の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 373, "word": "whether", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "～かどうか", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 374, "word": "worth", "meishi": "価値", "doushi": "", "keiyoushi": "価値がある", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 375, "word": "acquisition", "meishi": "買収", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 376, "word": "advance", "meishi": "前進・進歩", "doushi": "～を進める", "keiyoushi": "事前の", "fukushi": "前もって", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 377, "word": "agenda", "meishi": "議題", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 378, "word": "author", "meishi": "著者", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 379, "word": "complex", "meishi": "", "doushi": "", "keiyoushi": "複雑な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 380, "word": "condition", "meishi": "状態・条件", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 381, "word": "continue", "meishi": "", "doushi": "～を続ける", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 382, "word": "efficient", "meishi": "", "doushi": "", "keiyoushi": "効率的な", "fukushi": "効率的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 383, "word": "entrance", "meishi": "入口", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 384, "word": "further", "meishi": "", "doushi": "", "keiyoushi": "さらなる", "fukushi": "さらに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 385, "word": "lead", "meishi": "リード・主導", "doushi": "～を導く・主導する", "keiyoushi": "主要な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 386, "word": "often", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "しばしば", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 387, "word": "patient", "meishi": "患者", "doushi": "", "keiyoushi": "我慢強い", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 388, "word": "procedure", "meishi": "手順", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 389, "word": "quickly", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "素早く", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 390, "word": "regarding", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～に関して", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 391, "word": "regional", "meishi": "", "doushi": "", "keiyoushi": "地域の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 392, "word": "respond", "meishi": "", "doushi": "～に返信する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 393, "word": "share", "meishi": "共有・株", "doushi": "～を共有する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 394, "word": "unfortunately", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "残念ながら", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 395, "word": "TRUE", "meishi": "", "doushi": "", "keiyoushi": "本当の", "fukushi": "本当に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 396, "word": "apologize", "meishi": "", "doushi": "謝る", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 397, "word": "bill", "meishi": "請求書", "doushi": "～に請求する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 398, "word": "carefully", "meishi": "", "doushi": "", "keiyoushi": "注意深く", "fukushi": "注意深く", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 399, "word": "case", "meishi": "場合・事例", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 400, "word": "cover", "meishi": "カバー・覆い", "doushi": "～を覆う・～を扱う", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 401, "word": "deposit", "meishi": "預金・保証金", "doushi": "～を預ける", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 402, "word": "except", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～を除いて", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 403, "word": "expert", "meishi": "専門家", "doushi": "", "keiyoushi": "専門的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 404, "word": "extremely", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "極めて", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 405, "word": "familiar", "meishi": "", "doushi": "", "keiyoushi": "よく知られた", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 406, "word": "force", "meishi": "力", "doushi": "～を強いる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 407, "word": "grant", "meishi": "助成金・許可", "doushi": "～を与える・許可する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 408, "word": "headquarters", "meishi": "本社", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 409, "word": "outdoors", "meishi": "", "doushi": "", "keiyoushi": "屋外の", "fukushi": "屋外で", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 410, "word": "plenty", "meishi": "たくさん", "doushi": "", "keiyoushi": "十分な", "fukushi": "たくさん", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 411, "word": "quarter", "meishi": "四半期", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 412, "word": "refund", "meishi": "払い戻し", "doushi": "～を払い戻す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 413, "word": "serve", "meishi": "", "doushi": "～に仕える・～を提供する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 414, "word": "specialize", "meishi": "", "doushi": "～を専門とする", "keiyoushi": "専門の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 415, "word": "technical", "meishi": "", "doushi": "", "keiyoushi": "技術的な", "fukushi": "技術的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 416, "word": "term", "meishi": "用語・期間", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 417, "word": "unique", "meishi": "", "doushi": "", "keiyoushi": "独特の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 418, "word": "advantage", "meishi": "利点", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 419, "word": "almost", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "ほとんど", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 420, "word": "approve", "meishi": "", "doushi": "～を承認する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 421, "word": "assign", "meishi": "", "doushi": "～を割り当てる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 422, "word": "branch", "meishi": "支店・枝", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 423, "word": "cause", "meishi": "原因", "doushi": "～を引き起こす", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 424, "word": "ceremony", "meishi": "式典", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 425, "word": "funding", "meishi": "資金調達", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 426, "word": "garage", "meishi": "車庫", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 427, "word": "glad", "meishi": "", "doushi": "", "keiyoushi": "嬉しい", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 428, "word": "impress", "meishi": "", "doushi": "～に印象を与える", "keiyoushi": "印象的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 429, "word": "indicate", "meishi": "", "doushi": "～を示す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 430, "word": "relocate", "meishi": "", "doushi": "移転する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 431, "word": "manuscript", "meishi": "原稿", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 432, "word": "merger", "meishi": "合併", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 433, "word": "option", "meishi": "選択肢", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 434, "word": "record", "meishi": "記録・記録物", "doushi": "～を記録する", "keiyoushi": "記録的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 435, "word": "reduce", "meishi": "", "doushi": "～を減らす", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 436, "word": "result", "meishi": "結果", "doushi": "～に終わる", "keiyoushi": "結果として起こる", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 437, "word": "satisfy", "meishi": "", "doushi": "～を満足させる", "keiyoushi": "満足した", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 438, "word": "spend", "meishi": "", "doushi": "～を使う・費やす", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 439, "word": "urban", "meishi": "", "doushi": "", "keiyoushi": "都市の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 440, "word": "accommodate", "meishi": "", "doushi": "～を収容する・～に対応する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 441, "word": "admission", "meishi": "入場・入会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 442, "word": "allow", "meishi": "", "doushi": "～を許す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 443, "word": "among", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～の中に", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 444, "word": "baggage", "meishi": "手荷物", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 445, "word": "claim", "meishi": "主張・請求", "doushi": "～を主張する・請求する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 446, "word": "demand", "meishi": "需要・要求", "doushi": "～を要求する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 447, "word": "encourage", "meishi": "", "doushi": "～を励ます", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 448, "word": "frequently", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "頻繁に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 449, "word": "inspection", "meishi": "検査", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 450, "word": "operation", "meishi": "運営・操作", "doushi": "～を操作する", "keiyoushi": "操作の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 451, "word": "patronage", "meishi": "愛顧", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 452, "word": "ride", "meishi": "乗車", "doushi": "～に乗る", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 453, "word": "shuttle", "meishi": "シャトル便", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 454, "word": "solution", "meishi": "解決策", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 455, "word": "acclaim", "meishi": "称賛", "doushi": "～を称賛する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 456, "word": "administration", "meishi": "管理・運営", "doushi": "", "keiyoushi": "管理の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 457, "word": "appliance", "meishi": "電化製品", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 458, "word": "appropriate", "meishi": "", "doushi": "", "keiyoushi": "適切な", "fukushi": "適切に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 459, "word": "avoid", "meishi": "", "doushi": "～を避ける", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 460, "word": "battery", "meishi": "電池", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 461, "word": "booth", "meishi": "ブース・小屋", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 462, "word": "certificate", "meishi": "証明書", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 463, "word": "cuisine", "meishi": "料理", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 464, "word": "cupboard", "meishi": "食器棚", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 465, "word": "defective", "meishi": "", "doushi": "", "keiyoushi": "欠陥のある", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 466, "word": "entertainment", "meishi": "エンターテイメント", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 467, "word": "exercise", "meishi": "運動・練習", "doushi": "～を運動する・練習する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 468, "word": "expand", "meishi": "", "doushi": "～を拡大する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 469, "word": "flexible", "meishi": "", "doushi": "", "keiyoushi": "柔軟な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 470, "word": "general", "meishi": "", "doushi": "", "keiyoushi": "一般的な", "fukushi": "一般的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 471, "word": "hope", "meishi": "希望", "doushi": "～を望む", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 472, "word": "improve", "meishi": "", "doushi": "～を改善する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 473, "word": "inquire", "meishi": "", "doushi": "～に問い合わせる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 474, "word": "inventory", "meishi": "在庫", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 475, "word": "invoice", "meishi": "請求書", "doushi": "～に請求書を送る", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 476, "word": "insist", "meishi": "", "doushi": "～を主張する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 477, "word": "lately", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "最近", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 478, "word": "legal", "meishi": "", "doushi": "", "keiyoushi": "法的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 479, "word": "missing", "meishi": "", "doushi": "", "keiyoushi": "見当たらない", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 480, "word": "monitor", "meishi": "モニター・監視装置", "doushi": "～を監視する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 481, "word": "original", "meishi": "", "doushi": "", "keiyoushi": "元の", "fukushi": "元々", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 482, "word": "perfect", "meishi": "", "doushi": "", "keiyoushi": "完璧な", "fukushi": "完璧に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 483, "word": "positive", "meishi": "", "doushi": "", "keiyoushi": "肯定的な", "fukushi": "肯定的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 484, "word": "precisely", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "正確に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 485, "word": "predict", "meishi": "", "doushi": "～を予測する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 486, "word": "reach", "meishi": "", "doushi": "～に達する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 487, "word": "reference", "meishi": "照会・参考文献", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 488, "word": "refreshment", "meishi": "軽食", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 489, "word": "renovation", "meishi": "改装", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 490, "word": "responsible", "meishi": "", "doushi": "", "keiyoushi": "責任のある", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 491, "word": "retail", "meishi": "小売", "doushi": "", "keiyoushi": "小売の", "fukushi": "小売で", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 492, "word": "sink", "meishi": "流し台", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 493, "word": "stairs", "meishi": "階段", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 494, "word": "subscription", "meishi": "定期購読", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 495, "word": "transition", "meishi": "移行", "doushi": "～を移行する", "keiyoushi": "移行の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 496, "word": "utensil", "meishi": "台所用品", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 497, "word": "valid", "meishi": "", "doushi": "", "keiyoushi": "有効な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 498, "word": "without", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "～なしで", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 499, "word": "afraid", "meishi": "", "doushi": "", "keiyoushi": "恐れて", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 500, "word": "agree", "meishi": "", "doushi": "～に同意する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 501, "word": "anniversary", "meishi": "記念日", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 502, "word": "business", "meishi": "ビジネス・事業", "doushi": "", "keiyoushi": "ビジネスの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 503, "word": "comfortable", "meishi": "", "doushi": "", "keiyoushi": "快適な", "fukushi": "快適に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 504, "word": "complimentary", "meishi": "", "doushi": "", "keiyoushi": "無料の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 505, "word": "consumer", "meishi": "消費者", "doushi": "", "keiyoushi": "消費者の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 506, "word": "contain", "meishi": "", "doushi": "～を含む", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 507, "word": "division", "meishi": "部門", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 508, "word": "especially", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "特に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 509, "word": "extensive", "meishi": "", "doushi": "", "keiyoushi": "広範囲の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 510, "word": "famous", "meishi": "", "doushi": "", "keiyoushi": "有名な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 511, "word": "guarantee", "meishi": "保証", "doushi": "～を保証する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 512, "word": "ingredient", "meishi": "材料", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 513, "word": "launch", "meishi": "開始・発売", "doushi": "～を開始する・発売する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 514, "word": "modern", "meishi": "", "doushi": "", "keiyoushi": "現代的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 515, "word": "notify", "meishi": "", "doushi": "～に通知する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 516, "word": "potential", "meishi": "可能性", "doushi": "", "keiyoushi": "潜在的な", "fukushi": "潜在的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 517, "word": "prevent", "meishi": "", "doushi": "～を防ぐ", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 518, "word": "prior", "meishi": "", "doushi": "", "keiyoushi": "事前の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 519, "word": "prospective", "meishi": "", "doushi": "", "keiyoushi": "見込みのある", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 520, "word": "remember", "meishi": "", "doushi": "～を覚えている", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 521, "word": "renew", "meishi": "", "doushi": "～を更新する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 522, "word": "reputation", "meishi": "評判", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 523, "word": "rest", "meishi": "休憩・残り", "doushi": "休む", "keiyoushi": "残りの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 524, "word": "separate", "meishi": "", "doushi": "～を分ける", "keiyoushi": "別々の", "fukushi": "別々に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 525, "word": "strictly", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "厳密に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 526, "word": "suitable", "meishi": "", "doushi": "", "keiyoushi": "適切な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 527, "word": "therefore", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "したがって", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 528, "word": "transfer", "meishi": "転勤・移動", "doushi": "～を転勤させる・移動させる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 529, "word": "ahead", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "前方に・先に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 530, "word": "amount", "meishi": "量", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 531, "word": "appear", "meishi": "", "doushi": "現れる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 532, "word": "architecture", "meishi": "建築・構造", "doushi": "", "keiyoushi": "建築の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 533, "word": "below", "meishi": "", "doushi": "", "keiyoushi": "下の", "fukushi": "下に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 534, "word": "break", "meishi": "休憩・破損", "doushi": "壊れる・～を壊す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 535, "word": "browse", "meishi": "", "doushi": "閲覧する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 536, "word": "catering", "meishi": "ケータリング", "doushi": "", "keiyoushi": "ケータリングの", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 537, "word": "central", "meishi": "", "doushi": "", "keiyoushi": "中央の", "fukushi": "中央に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 538, "word": "century", "meishi": "世紀", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 539, "word": "chief", "meishi": "長・主任", "doushi": "", "keiyoushi": "主要な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 540, "word": "common", "meishi": "", "doushi": "", "keiyoushi": "一般的な", "fukushi": "一般的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 541, "word": "competition", "meishi": "競争", "doushi": "", "keiyoushi": "競争の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 542, "word": "confident", "meishi": "", "doushi": "", "keiyoushi": "自信のある", "fukushi": "自信を持って", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 543, "word": "consultant", "meishi": "コンサルタント", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 544, "word": "correctly", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "正しく", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 545, "word": "council", "meishi": "議会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 546, "word": "deal", "meishi": "取引", "doushi": "～を扱う", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 547, "word": "designate", "meishi": "", "doushi": "～を指定する", "keiyoushi": "指定された", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 548, "word": "duty", "meishi": "義務", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 549, "word": "durable", "meishi": "", "doushi": "", "keiyoushi": "耐久性のある", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 550, "word": "dramatic", "meishi": "", "doushi": "", "keiyoushi": "劇的な", "fukushi": "劇的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 551, "word": "eager", "meishi": "", "doushi": "", "keiyoushi": "熱心な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 552, "word": "eligible", "meishi": "", "doushi": "", "keiyoushi": "資格のある", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 553, "word": "environmentally", "meishi": "", "doushi": "", "keiyoushi": "環境に優しい", "fukushi": "環境的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 554, "word": "essential", "meishi": "", "doushi": "", "keiyoushi": "不可欠な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 555, "word": "estimate", "meishi": "見積もり", "doushi": "～を見積もる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 556, "word": "former", "meishi": "", "doushi": "", "keiyoushi": "以前の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 557, "word": "grocery", "meishi": "食料品", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 558, "word": "growth", "meishi": "成長", "doushi": "", "keiyoushi": "成長の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 559, "word": "individual", "meishi": "個人", "doushi": "", "keiyoushi": "個人の", "fukushi": "個別に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 560, "word": "institute", "meishi": "研究所・協会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 561, "word": "itinerary", "meishi": "旅程", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 562, "word": "material", "meishi": "材料", "doushi": "", "keiyoushi": "材料の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 563, "word": "mayor", "meishi": "市長", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 564, "word": "meal", "meishi": "食事", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 565, "word": "method", "meishi": "方法", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 566, "word": "newsletter", "meishi": "ニュースレター", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 567, "word": "otherwise", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "さもなければ", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 568, "word": "particular", "meishi": "", "doushi": "", "keiyoushi": "特定の", "fukushi": "特に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 569, "word": "raise", "meishi": "昇給・育成", "doushi": "～を上げる・育てる", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 570, "word": "regulation", "meishi": "規制", "doushi": "", "keiyoushi": "規制の", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 571, "word": "reimbursement", "meishi": "払い戻し", "doushi": "～を払い戻す", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 572, "word": "release", "meishi": "発売・公開", "doushi": "～を発売する・公開する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 573, "word": "remodel", "meishi": "改装", "doushi": "～を改装する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 574, "word": "shift", "meishi": "シフト・交代", "doushi": "～を移す・交代する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 575, "word": "simply", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "単に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 576, "word": "stationery", "meishi": "文房具", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 577, "word": "strategy", "meishi": "戦略", "doushi": "", "keiyoushi": "戦略的な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 578, "word": "track", "meishi": "追跡・線路", "doushi": "～を追跡する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 579, "word": "traditional", "meishi": "", "doushi": "", "keiyoushi": "伝統的な", "fukushi": "伝統的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 580, "word": "valuable", "meishi": "", "doushi": "", "keiyoushi": "貴重な", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 581, "word": "via", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～経由で", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 582, "word": "analysis", "meishi": "分析", "doushi": "～を分析する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 583, "word": "behind", "meishi": "", "doushi": "", "keiyoushi": "後ろの", "fukushi": "後ろに", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 584, "word": "bureau", "meishi": "事務局", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 585, "word": "concierge", "meishi": "案内人", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 586, "word": "conduct", "meishi": "行為・実施", "doushi": "～を行う・実施する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 587, "word": "enroll", "meishi": "", "doushi": "～に入会する・登録する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 588, "word": "fix", "meishi": "修理・固定", "doushi": "～を修理する・固定する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 589, "word": "similar", "meishi": "", "doushi": "", "keiyoushi": "似た", "fukushi": "同様に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 590, "word": "afford", "meishi": "", "doushi": "～を買う余裕がある", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 591, "word": "assume", "meishi": "", "doushi": "～を仮定する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 592, "word": "average", "meishi": "平均", "doushi": "～を平均する", "keiyoushi": "平均の", "fukushi": "平均して", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 593, "word": "behalf", "meishi": "", "doushi": "", "keiyoushi": "", "fukushi": "～を代表して", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 594, "word": "commercial", "meishi": "", "doushi": "", "keiyoushi": "商業的な", "fukushi": "商業的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 595, "word": "donation", "meishi": "寄付", "doushi": "～を寄付する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 596, "word": "enthusiastic", "meishi": "", "doushi": "", "keiyoushi": "熱狂的な", "fukushi": "熱狂的に", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 597, "word": "evaluate", "meishi": "", "doushi": "～を評価する", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 598, "word": "fare", "meishi": "運賃", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 599, "word": "luncheon", "meishi": "昼食会", "doushi": "", "keiyoushi": "", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
    , { "no": 600, "word": "modest", "meishi": "", "doushi": "", "keiyoushi": "控えめな", "fukushi": "", "zentishi": "", "setuzokushi": "", "testcount": 0, "testcount1": 0, "completedflag": false }
]);

//DBから取得した値をここに入れる
// initialWordsData.value = DB取得値
async function saveArray() {
    try {
        if (wordsData.value.length < 1) {
            wordsData.value = initialWordsData.value;
        }
        // await db.dataStore.clear();
        await db.dataStore.put({ id: 1, vocabulary: JSON.parse(JSON.stringify(wordsData.value)) });
        console.log("配列が1つのレコードとして保存されました。");
    } catch (err) {
        console.error("データ追加エラー: " + err);
    }
}
const wordsData = ref([]);
async function getData(id) {
    const data = await db.dataStore.get(id);
    console.log(data.vocabulary);
    wordsData.value = data.vocabulary;
}

const handleRowClick = (item) => { // eventではなくitemを直接受け取るように修正
    item.completedflag = !item.completedflag // itemはrefで管理されているので直接変更可能
}

onMounted(async () => {
    await getData(1);
})

</script>

<template>
    <button style="background-color: blue; color: white; border-radius: 8px;" @click="saveArray()">最新情報保存</button>
    <button style="background-color: blue; color: white; border-radius: 8px;" @click="getData(1)"> 最新情報取得</button>
    <div class="word-list">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>単語</th>
                        <th>意味</th>
                        <th>テスト回数(英)</th>
                        <th>テスト回数(日)</th>
                        <th>済</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="item" :style="{ backgroundColor: item.completedflag ? 'yellow' : 'white' }"
                        @click="handleRowClick(item)" v-for="item in wordsData" :key="item.no">
                        <td style="width: 10px;">{{ item.no }}</td>
                        <td style="width: 50px;">{{ item.word }}</td>
                        <td style="width: 150px;">
                            <template v-if="item.meishi"> (名){{ item.meishi }}<br> </template>
                            <template v-if="item.doushi"> (動){{ item.doushi }}<br> </template>
                            <template v-if="item.keiyoushi"> (形){{ item.keiyoushi }}<br> </template>
                            <template v-if="item.fukushi"> (副){{ item.fukushi }}<br> </template>
                            <template v-if="item.zentishi"> (前){{ item.zentishi }}<br> </template>
                            <template v-if="item.setuzokushi"> (接){{ item.setuzokushi }} </template>
                        </td>
                        <td style="width: 80px;">{{ item.testcount }}</td>
                        <td style="width: 80px;">{{ item.testcount1 }}</td>
                        <td style="width: 10px;"><input type="checkbox" v-model="item.completedflag" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <br>
    </div>
</template>

<style scoped>
/* スタイルは元のままで問題ありません */
.word-list {
    position: relative;
    top: 0px;
    border: 1px solid #ccc;
    height: 90vh;
    overflow-y: auto;
}

.table-container {
    height: 90vh;
    overflow-y: auto;
    border: 1px solid #ccc;
}

.table-container table {
    width: 100%;
    border-collapse: collapse;
}

.table-container thead {
    position: sticky;
    top: 0;
    background-color: #f2f2f2;
    z-index: 1;
}

.table-container th,
.table-container td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.item {
    font-weight: bold;
}

@media screen and (max-width: 767px) {

    .table-container th,
    .table-container td {
        padding: 1px;
        border: 1px solid #ddd;
        text-align: left;
        font-size: 9px;
    }
}
</style>
