<template>
  <b-container class="p-0">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">
        <Logo :width="75" :height="25" /> DashBoard
      </b-navbar-brand>
      <b-navbar-nav>
        <b-button variant="outline-danger" @click="addWidgets"
          >Add Widgets
        </b-button>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav class="ml-auto">
        <b-button size="sm" class="my-2 my-sm-0" type="submit">
          Sign out
        </b-button>
      </b-navbar-nav>
      <!-- </b-collapse> -->
    </b-navbar>
    <b-modal v-model="showWidgets">
      <CardWidget
        v-for="(item, name) in items"
        :key="name"
        :title="name"
        :description="item.description"
        :args="item.args"
      >
      </CardWidget>
      <!--<CardWidget v-for="(item, index) in items" :key="index" :title="item">
      </CardWidget>-->
    </b-modal>
  </b-container>
</template>

<script>
import Logo from '@/components/Logo.vue';
import CardWidget from '@/components/Card.vue';

export default {
  name: 'DSNavBar',
  components: { Logo, CardWidget },
  data() {
    return {
      titleS: 'Twitter',
      showWidgets: false,
      items: {},
    };
  },
  methods: {
    async addWidgets() {
      const resp = await this.$axios.$get('/user/getwidgetinfo');
      this.showWidgets = true;
      this.items = resp;
    },
  },
};
</script>
