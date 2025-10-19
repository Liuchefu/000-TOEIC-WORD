<script setup>
import { ref } from 'vue';
import TestMenu1 from '@/components/TestMenu1.vue';
const drawer = ref(true)

</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>単語アプリ</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-container>
        <TestMenu1 />
      </v-container>
    </v-navigation-drawer>

    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>