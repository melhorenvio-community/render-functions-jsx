<script setup>
import SearchTv from "../components/SearchTv.vue";

const computedAverage = (shows) =>
  shows.reduce((acc, info) => +info.score + acc, 0)
</script>

<template>
  <main>
    <search-tv>
      <template #sc="{ shows }">
        <h3 class="text" v-if="shows?.length > 0">
          Average Score : {{ computedAverage(shows).toFixed(1) }}
        </h3>
      </template>
    </search-tv>
  </main>
</template>
<style scoped>
.text {
  text-align: center;
  font-family: sans-serif;
  font-weight: 400;
  font-size: large;
  margin-top: 30px;
  font-size: 20px;
}
</style>

