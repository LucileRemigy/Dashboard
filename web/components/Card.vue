<template>
  <b-container class="col">
    <b-card
      :title="`${title}`"
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text>{{ description }}</b-card-text>
      <b-form-group label="Enter your Widget's name" label-for="nameWidget">
        <b-form-input
          id="nameWidget"
          v-model="nameWidget"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <div v-for="(item, name) in args" :key="name">
        <b-form-group :label="`Enter your ${name}`" label-for="target">
          <b-form-input
            id="target"
            v-model="target"
            type="text"
            required
          ></b-form-input>
          <vue-up></vue-up>
        </b-form-group>
      </div>
      <b-alert
        variant="danger"
        dismissible
        fade
        :show="showDismissibleAlert"
        @dismissed="showDismissibleAlert = false"
        >Information is missing!
      </b-alert>
      <b-button href="#" variant="danger" @click="addWidget"
        >Add Widget</b-button
      >
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'CardWidget',
  components: {},
  props: {
    title: {
      type: String,
      default: 'No Title',
    },
    description: {
      type: String,
      default: 'No description',
    },
    args: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      targetname: '',
      target: '',
      nameWidget: '',
      typeWidget: `${this.title}`,
      showDismissibleAlert: false,
    };
  },
  methods: {
    async addWidget() {
      if (this.target === '' || this.nameWidget === '') {
        this.showDismissibleAlert = true;
      } else {
        if (this.typeWidget === 'follower' || this.typeWidget === 'tweet') {
          this.targetname = 'target';
        }
        if (this.typeWidget === 'temperature' || this.typeWidget === 'city') {
          this.targetname = 'city';
        }
        const resp = await this.$axios.$post('/user/createwidget', {
          typeWidget: this.typeWidget,
          argsWidget: { targetname: this.target },
          nameWidget: this.nameWidget,
        });
        console.log('la rep est', resp);
      }
    },
  },
};
</script>
<style lang=""></style>
