<script setup>
import { reactive, watch, onMounted } from 'vue'
// Composition API の場合
import { useRouter } from 'vue-router'
const router = useRouter()

// LocalStorageキー定義（重複を避けるためプレフィックスをつけると安全）
const STORAGE_KEYS = {
  filters: 'wordTestFilters',
}

// デフォルト値
const filters = reactive({

  einitiranduomFlag: false,
  eiranduomFlag: false,
  nitiranduomFlag: false,
  testRangeStart: 1,
  testRangeEnd: 600,
  testCount: 50,
  testTime: 300,
})

// 保存処理
watch(filters, (val) => {
  localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify(val))
}, { deep: true })

// 初期化：localStorage から読み込み
onMounted(() => {
  // const storedFilters = localStorage.getItem(STORAGE_KEYS.filters)
  localStorage.getItem(STORAGE_KEYS.filters) || localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify({ noun: false, verb: false, adjective: false, adverb: false, preposition: false, conjunction: false, randuomFlag: false, testRangeStart: 1, testRangeEnd: 600, testCount: 50, testTime: 300 }));
  const storedFilters = localStorage.getItem(STORAGE_KEYS.filters) || localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify({ noun: false, verb: false, adjective: false, adverb: false, preposition: false, conjunction: false, randuomFlag: false, testRangeStart: 1, testRangeEnd: 600, testCount: 50, testTime: 300 }));
  console.log(storedFilters);
  if (storedFilters) Object.assign(filters, JSON.parse(storedFilters))
})



const test = () => {
  // 現在のクエリパラメータに、ユニークな値を付与
  const uniqueKey = Date.now() // 現在のタイムスタンプ
  console.log(uniqueKey);
  router.push({
    name: 'TestView',
    query: {
      key: uniqueKey
    }
  })
}

const WordView = () => {
  // 現在のクエリパラメータに、ユニークな値を付与
  router.push({
    name: 'WordView',
  })
}

const changeMode = (einiti, ei, niti) => {
  filters.einitiranduomFlag = einiti
  filters.eiranduomFlag = ei
  filters.nitiranduomFlag = niti
}

</script>


<template>
  <v-divider></v-divider>
  <h3>単語テスト設定</h3>
  <v-divider></v-divider>
  <input type="checkbox" v-model="filters.einitiranduomFlag"
    @input="changeMode(true, false, false)" /><span>英日ランダム</span><br>
  <input type="checkbox" v-model="filters.eiranduomFlag"
    @input="changeMode(false, true, false)" /><span>英ランダム</span><br>
  <input type="checkbox" v-model="filters.nitiranduomFlag"
    @input="changeMode(false, false, true)" /><span>日ランダム</span><br>
  <label for="min-no">テスト範囲: No.</label>
  <br />
  <input class="min-no" type="number" v-model="filters.testRangeStart" />
  <span>～</span>
  <input class="max-no" type="number" v-model="filters.testRangeEnd" />
  <br />
  <label for="random-count">出題数 (空欄で全問):</label>
  <input type="number" id="random-count" v-model="filters.testCount" min="1" />
  <br />
  <label for="test-duration">テスト時間 (秒):</label>
  <input type="number" id="test-duration" v-model="filters.testTime" min="10" />
  <br />
  <v-divider></v-divider>
  <button class="button" @click="test">テスト画面</button>
  <button class="button" @click="WordView">一覧画面</button>
  <v-divider></v-divider>
</template>

<style scoped>
.min-no {
  width: 50px;
  text-align: right;
}

.max-no {
  width: 50px;
  text-align: left;
}

.button {
  background-color: blue;
  color: white;
  border-radius: 5px;
  margin: 5px;
}
</style>