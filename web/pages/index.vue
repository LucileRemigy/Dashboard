<template>
  <section class="container">
    <div>
      <Logo />
      <h1 class="title">Dashboard</h1>
      <b-form-group label="Enter your Email" label-for="username">
        <b-form-input
          id="username"
          v-model="email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Enter your Password" label-for="pw">
        <b-form-input id="pw" v-model="password" type="password"></b-form-input>
      </b-form-group>
      <div class="links">
        <a href="https://nuxtjs.org/" class="button--green"> Sign In </a>
        <a href="https://github.com/nuxt/nuxt.js" class="button--grey">
          Sign Up
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
    };
  },
  watch: {},
  mounted() {},
  methods: {
    SignIn() {},
    SignUp() {},
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<!--
<Logo />
      <h1 class="title">Dashboard</h1>
<div class="links">
        <a
          href="https://nuxtjs.org/"
          class="button--green"
        >
          Sign In
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          class="button--grey"
        >
          Sign Up
        </a>
      </div>
      -->
