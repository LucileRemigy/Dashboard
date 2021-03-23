<template>
  <b-container>
    <DSNavBar></DSNavBar>
    <b-container
      v-if="Object.keys(userWidget).length === 0"
      class="text-center align-middle"
    >
      <b-spinner label="Spinning"></b-spinner>
    </b-container>

    <div v-for="(item, name) in userWidget" :key="name">
      <div v-for="(itemR, nameW) in resultWidget" :key="nameW">
        <div v-if="name == nameW">
          <WidgetUser
            :title="name"
            :type="item.type"
            :target="item.args.targetname"
            :result="itemR"
          >
          </WidgetUser>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import DSNavBar from '@/components/NavBar.vue';
import WidgetUser from '@/components/Widget.vue';

export default {
  name: 'DS',
  components: { DSNavBar, WidgetUser },
  data() {
    return {
      resultWidget: {},
      userWidget: {},
    };
  },
  mounted() {
    window.setInterval(() => {
      this.displayUserWidget();
    }, 10000);
  },
  methods: {
    async displayUserWidget() {
      const resp = await this.$axios.$get('/user/executewidgets', {});
      const respUser = await this.$axios.$get('/user/getuserwidget', {});
      this.resultWidget = resp;
      this.userWidget = respUser;
      // console.log('les resultats des resultwidget sont ', this.resultWidget);
      // console.log('les userwidgets sont ', this.userWidget);
    },
  },
};
</script>

<style lang="sass" scoped></style>
