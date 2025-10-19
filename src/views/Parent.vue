<template>
  <Child @sendMessage="handleMessage" />
  <p>子からのメッセージ: {{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import Child from '@/components/Child.vue'

const message = ref('')

const handleMessage = (msg) => {
  message.value = msg
}
</script>
