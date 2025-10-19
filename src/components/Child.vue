<script setup>
const emit = defineEmits(['sendMessage'])

const send = () => {
  emit('sendMessage', 'こんにちは、親コンポーネント！')
}
</script>

<template>
  <button @click="send">親にメッセージ送信</button>
</template>