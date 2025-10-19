<script setup>
import { reactive, watch, onMounted, defineEmits } from 'vue'
// Composition API の場合
import { useRouter } from 'vue-router'
const router = useRouter()

const emit = defineEmits(['filterData'])

// LocalStorageキー定義（重複を避けるためプレフィックスをつけると安全）
const STORAGE_KEYS = {
  filters: 'wordTestFilters',
}

// デフォルト値
const filters = reactive({
  noun: false,
  verb: false,
  adjective: false,
  adverb: false,
  preposition: false,
  conjunction: false,
  randuomFlag: false,
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
  const storedFilters = localStorage.getItem(STORAGE_KEYS.filters)
  if (storedFilters) Object.assign(filters, JSON.parse(storedFilters))
  startTest();
})

// テスト開始ボタン
const startTest = () => {
  emit('filterData', filters);
}

const test = () =>{
  router.push({ name: 'TestView' });
}

</script>


<template>
  <v-divider></v-divider>
  <h3>単語テスト設定</h3>
  <v-divider></v-divider>
  <input type="checkbox" v-model="filters.noun" id="filter-meishi" value="meishi" /><span>名詞</span><br>
  <input type="checkbox" v-model="filters.verb" id="filter-doushi" value="doushi" /><span>動詞</span><br>
  <input type="checkbox" v-model="filters.adjective" id="filter-keiyoushi" value="keiyoushi" /><span>形容詞</span><br>
  <input type="checkbox" v-model="filters.adverb" id="filter-fukushi" value="fukushi" /><span>副詞</span><br>
  <input type="checkbox" v-model="filters.preposition" id="filter-zentishi" value="zentishi" /><span>前置詞</span><br>
  <input type="checkbox" v-model="filters.conjunction" id="filter-setuzokushi"
    value="setuzokushi" /><span>接続詞</span><br>
  <v-divider></v-divider>
  <input type="checkbox" v-model="filters.randuomFlag" id="filter-random" value="random" /><span>ランダム</span><br>
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
  <button @click="test">テスト開始</button>
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
</style>