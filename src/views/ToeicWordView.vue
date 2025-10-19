<script setup>
import { ref } from 'vue';
import TestMenu from '@/components/TestMenu.vue';
import WordList from '@/components/WordList.vue';

const drawer = ref(true)

const message = ref('')
const filters = (msg) => {
  message.value = msg;
}


</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>単語アプリ</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-container>
        <TestMenu @filterData="filters" />
      </v-container>
    </v-navigation-drawer>

    <v-main class="overflow-hidden">
        <WordList :ListData="message" />
    </v-main>
  </v-app>
</template>


<style scoped></style>