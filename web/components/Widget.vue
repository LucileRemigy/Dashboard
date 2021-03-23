<template>
  <b-container class="col">
    <b-card
      :title="`${title}`"
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text>
        <h1 v-if="type == 'follower'">
          {{ target }} has {{ result }} followers !
        </h1>
        <h1 v-if="type == 'tweet'">
          The last tweet of {{ target }} was {{ result }} !
        </h1>
        <h1 v-if="type == 'temperature'">
          The temperature in {{ target }} is {{ result }} !
        </h1>
        <h1 v-if="type == 'weather'">
          The weather in {{ target }} is {{ result }} !
        </h1>
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'WidgetUser',
  components: {},
  props: {
    title: {
      type: String,
      default: 'No name',
    },
    type: {
      type: String,
      default: 'undefined',
    },
    target: {
      type: String,
      default: 'undefined',
    },
    result: {
      type: String,
      default: 'undefined',
    },
  },
  data() {},
  methods: {},
};
</script>
<style lang=""></style>
