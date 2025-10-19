<script setup>
//TODO 
//済みを更新する処理を追加する
import { ref, onMounted } from 'vue';
import db from '@/assets/indexeddb';

//DBから取得した値をここに入れる
// saveRireki
const saveRireki = async () => {
  try {
    // JSON.stringify()とJSON.parse()を使って、データを完全にクローンする
    const plainData = JSON.parse(JSON.stringify(displayDataArr.value));
    console.log(plainData);
    await db.rerekistore.add({ vocabulary: plainData });
    alert("履歴が保存されました。");
  } catch (err) {
    console.error("データ追加エラー: " + err);
  }
};

// getRirekiData
const getRirekiData = async () => {

  const data = await db.rerekistore.get(selectedRirekiId.value);
  console.log(data.vocabulary);
  displayDataArr.value = data.vocabulary;
};

// 履歴のID一覧を保持するリアクティブな変数
const rirekiIds = ref([]);
// 選択された履歴のIDを保持するリアクティブな変数
const selectedRirekiId = ref(null);

// 保存された履歴のID一覧を取得する関数
const fetchRirekiIds = async () => {
  try {
    // rerekistoreからすべてのレコードを取得
    const records = await db.rerekistore.toArray();
    // 各レコードからidのみを抽出し、rirekiIdsに代入
    rirekiIds.value = records.map(record => record.id);

    // 取得したID一覧の最初のものを初期値として設定
    if (rirekiIds.value.length > 0) {
      selectedRirekiId.value = rirekiIds.value[0];
    }
  } catch (err) {
    console.error("履歴IDの取得エラー: " + err);
  }
};


// 初期化：localStorage から読み込み
// LocalStorageキー定義（重複を避けるためプレフィックスをつけると安全）
const STORAGE_KEYS = {
  filters: 'wordTestFilters',
}

const settingsJsonData = ref({});
const count = ref(30);

onMounted(async () => {
  localStorage.getItem(STORAGE_KEYS.filters) || localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify({noun: false, verb: false, adjective: false, adverb: false, preposition: false, conjunction: false, randuomFlag: false, testRangeStart: 1, testRangeEnd: 600, testCount: 50, testTime: 300}));
  const storedFilters = localStorage.getItem(STORAGE_KEYS.filters) || localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify({noun: false, verb: false, adjective: false, adverb: false, preposition: false, conjunction: false, randuomFlag: false, testRangeStart: 1, testRangeEnd: 600, testCount: 50, testTime: 300}));
  settingsJsonData.value = JSON.parse(storedFilters);
  count.value = settingsJsonData.value.testTime;
  await test2()
  await test1();
  await fetchRirekiIds();
})


//----------配列を20個に分ける----------
const displayDataArr = ref([]);
let displayData = [];

const getRandomNumbers = (min, max, count, exclude = []) => {
  const range = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const possibleNumbers = range.filter(num => !exclude.includes(num));

  // 生成可能な最大数を超える場合は、可能な限り多くの乱数を返す
  if (count > possibleNumbers.length) {
    console.warn(`注意: 要求された乱数の数 (${count}) が、生成可能な最大の数 (${possibleNumbers.length}) を超えています。生成可能な最大の数を返します。`);
    count = possibleNumbers.length;
  }

  const numbers = new Set();
  while (numbers.size < count) {
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    const randomNumber = possibleNumbers[randomIndex];
    numbers.add(randomNumber);
    possibleNumbers.splice(randomIndex, 1); // 一度使った数字は候補から削除
  }

  return Array.from(numbers);
};

// 使い方:
// 例1: 10から34の範囲で5つのランダムな整数を生成
let randomArray2 = [];
const test1 = async () => {
  randomArray2 = await getRandomNumbers(settingsJsonData.value.testRangeStart, settingsJsonData.value.testRangeEnd, settingsJsonData.value.testCount, completedflagArr.value);
  // const randomArray2 = randomArray1.sort((a, b) => a - b);
  console.log(randomArray2);
  const data = await db.dataStore.get(1);
  console.log(data.vocabulary);
  for (const [index, item] of randomArray2.entries()) {
    displayData.push(data.vocabulary[item - 1]);
    if ((index + 1) % 15 === 0) {
      displayDataArr.value.push(displayData);
      displayData = [];
    }
  }
  console.log(displayData.length);
  if (displayData.length > 0) {
    displayDataArr.value.push(displayData);
  }
  console.log(displayDataArr.value);
}

const completedflagArr = ref([]);
const test2 = async () => {
  const data = await db.dataStore.get(1);
  console.log(data.vocabulary);
  for (const [index, item] of data.vocabulary.entries()) {
    if (item.completedflag) {
      completedflagArr.value.push(item.no);
    }
  }
  console.log(completedflagArr.value);
}

//----------------------------------
// testカウント
const testCount = async () => {
  const data = await db.dataStore.get(1);
  for (const [index, item] of randomArray2.entries()) {
    if (index % 2 === 0) {
      data.vocabulary[item - 1].testcount++;
    } else {
      data.vocabulary[item - 1].testcount1++;
    }
  }
  console.log(data);
  db.dataStore.put(data);
}


const handleRowClick = (item) => { // eventではなくitemを直接受け取るように修正
  item.completedflag = !item.completedflag // itemはrefで管理されているので直接変更可能
}

const bool = ref(false);
let isCounting = false;

const counter = async () => {
  if (isCounting) return; // prevent multiple countdowns
  if (displayDataArr.value[0].length == 0) return; //テスト単語の要素空の場合returnする
  isCounting = true;

  // 300秒カウントして
  const timer = setInterval(() => {
    if (count.value > 0) {
      count.value--;
    } else {
      bool.value = true;
      clearInterval(timer);
      isCounting = false; // reset flag
      saveRireki();
      testCount();
    }
  }, 1000);
}

</script>

<template>
  <div>
    <button @click="getRirekiData()">履歴参照</button>
    <select v-model="selectedRirekiId">
      <option v-for="id in rirekiIds" :key="id" :value="id">
        履歴 ID: {{ id }}
      </option>
    </select>
  </div>

  <div style="font-size: 30px;">残り{{ count }}秒 <button @click="counter"
      style="margin-left: 10px; height: 40px;">スタート</button></div>
  <button @click="bool = !bool">表示切替</button>



  <div class="container">
    <table class="item" v-for="objData in displayDataArr">
      <thead>
        <tr>
          <th>単語</th>
          <th>回答</th>
        </tr>
      </thead>
      <tbody>
        <tr class="item" :style="{ backgroundColor: item.completedflag ? 'yellow' : 'white' }"
          @click="handleRowClick(item)" v-for="(item, index) in objData" :key="item.no">
          <!------------ 英日ランダム ----------->
          <template v-if="settingsJsonData.einitiranduomFlag">
            <template v-if="index % 2 === 0">
              <td>{{ item.word }}</td>
              <td v-show="bool" class="meaning">
                <template v-if="item.meishi"> (名){{ item.meishi }}<br> </template>
                <template v-if="item.doushi"> (動){{ item.doushi }}<br> </template>
                <template v-if="item.keiyoushi"> (形){{ item.keiyoushi }}<br> </template>
                <template v-if="item.fukushi"> (副){{ item.fukushi }}<br> </template>
                <template v-if="item.zentishi"> (前){{ item.zentishi }}<br> </template>
                <template v-if="item.setuzokushi"> (接){{ item.setuzokushi }} </template>
              </td>
              <td v-show="!bool"></td>
            </template>

            <template v-else-if="index % 2 === 1">
              <td class="meaning">
                <template v-if="item.meishi"> (名){{ item.meishi }}<br> </template>
                <template v-if="item.doushi"> (動){{ item.doushi }}<br> </template>
                <template v-if="item.keiyoushi"> (形){{ item.keiyoushi }}<br> </template>
                <template v-if="item.fukushi"> (副){{ item.fukushi }}<br> </template>
                <template v-if="item.zentishi"> (前){{ item.zentishi }}<br> </template>
                <template v-if="item.setuzokushi"> (接){{ item.setuzokushi }} </template>
              </td>
              <td v-show="bool">{{ item.word }}</td>
              <td v-show="!bool"></td>
            </template>
          </template>
          <!------------ 英ランダム ----------->
          <template v-else-if="settingsJsonData.eiranduomFlag">
            <td>{{ item.word }}</td>
            <td v-show="bool" class="meaning">
              <template v-if="item.meishi"> (名){{ item.meishi }}<br> </template>
              <template v-if="item.doushi"> (動){{ item.doushi }}<br> </template>
              <template v-if="item.keiyoushi"> (形){{ item.keiyoushi }}<br> </template>
              <template v-if="item.fukushi"> (副){{ item.fukushi }}<br> </template>
              <template v-if="item.zentishi"> (前){{ item.zentishi }}<br> </template>
              <template v-if="item.setuzokushi"> (接){{ item.setuzokushi }} </template>
            </td>
            <td v-show="!bool"></td>
          </template>
          <!------------ それ以外英ランダム ----------->
          <template v-else>
            <td class="meaning">
              <template v-if="item.meishi"> (名){{ item.meishi }}<br> </template>
              <template v-if="item.doushi"> (動){{ item.doushi }}<br> </template>
              <template v-if="item.keiyoushi"> (形){{ item.keiyoushi }}<br> </template>
              <template v-if="item.fukushi"> (副){{ item.fukushi }}<br> </template>
              <template v-if="item.zentishi"> (前){{ item.zentishi }}<br> </template>
              <template v-if="item.setuzokushi"> (接){{ item.setuzokushi }} </template>
            </td>
            <td v-show="bool">{{ item.word }}</td>
            <td v-show="!bool"></td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>

  <button @click="saveRireki(), testCount()">テスト開始</button>
</template>

<style scoped>
.container {
  display: flex;
}

.item {
  /* その他のスタイル */
  margin: 10px;
  padding: 1px;
  background-color: #f0f0f0;
  font-weight: bold;
}

table {
  /* 子要素間のスペースを均等に分配 */
  width: 300px;
  border-collapse: collapse;
  /* 隣接する境界線を統合 */
}

th,
td {
  border: 1px solid black;
  /* セルに罫線を設定 */
  padding: 2px;
  /* セルの内側に余白を設定して見やすくする */
}

@media screen and (max-width: 767px) {
  table {
    min-width: 100px;
  }

  th,
  td {
    width: 80px;
    padding: 1px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 11px;
  }

  .meaning {
    min-width: 60px;
  }
}
</style>