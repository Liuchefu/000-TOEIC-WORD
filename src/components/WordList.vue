<script setup>
import { ref, computed } from 'vue'; // computedもインポート

const props = defineProps(['ListData']);

const initialWordsData = ref([
    { no: 1, word: "order", meishi: "注文・命令", doushi: "～を注文する", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 2, word: "meeting", meishi: "会議", doushi: "", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 3, word: "service", meishi: "サービス", doushi: "", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 4, word: "employee", meishi: "従業員", doushi: "", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 5, word: "department", meishi: "部署", doushi: "", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 6, word: "ask", meishi: "", doushi: "～を頼む・～を訪ねる", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 7, word: "available", meishi: "", doushi: "", keiyoushi: "利用できる・手に入る", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 8, word: "customer", meishi: "顧客", doushi: "", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 9, word: "place", meishi: "場所", doushi: "～を置く", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
    { no: 10, word: "travel", meishi: "旅行", doushi: "旅行する", keiyoushi: "", fukushi: "", zentishi: "", setuzokushi: "", testcount: 0, testcount1: 0, completedFlag: false },
]);

// filterDataをcomputedプロパティとして定義
const filteredWordsData = computed(() => {
    return initialWordsData.value.filter(item => {
        // ListDataがundefinedでないことを確認してからアクセス
        // defaultを設定しているので、props.ListDataは常にオブジェクトです

        // nounがtrueで、かつmeishiが空なら、このアイテムは除外
        if (props.ListData.noun && !item.meishi) return false;
        // verbがtrueで、かつdoushiが空なら、このアイテムは除外
        if (props.ListData.verb && !item.doushi) return false;
        if (props.ListData.adjective && !item.keiyoushi) return false;
        if (props.ListData.preposition && !item.zentishi) return false;
        if (props.ListData.adverb && !item.fukushi) return false;
        if (props.ListData.conjunction && !item.setuzokushi) return false;

        // 上記のどの条件にも当てはまらなければ、このアイテムは含める
        return true;
    });
});


const handleRowClick = (item) => { // eventではなくitemを直接受け取るように修正
    item.completedFlag = !item.completedFlag // itemはrefで管理されているので直接変更可能
}
</script>

<template>
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
                    <tr :style="{ backgroundColor: item.completedFlag ? 'yellow' : 'white' }"
                        @click="handleRowClick(item)" v-for="item in filteredWordsData" :key="item.no">
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
                        <td style="width: 10px;"><input type="checkbox" v-model="item.completedFlag" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <br>
        <h3>初期データ:</h3>
        <pre>{{ initialWordsData }}</pre>
        <h3>フィルターされたデータ:</h3>
        <pre>{{ filteredWordsData }}</pre>
        <h3>props.ListData:</h3>
        <pre>{{ props.ListData }}</pre>

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
    height: 40vh;
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