<template>
  <div class="signin">
    <form
      class="login"
      @submit.prevent="submit"
    >
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="email"
          required
          type="email"
          class="form-control"
          placeholder="Enter email"
        >
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          required
          type="password"
          class="form-control"
          placeholder="Password"
        >
      </div>
      <button
        type="submit"
        :disabled="loading"
      >
        Login
      </button>
      <hr>
    </form>
  </div>
</template>
<script>
import { login } from '@/plugins/axios';

export default {
  components: {},
  props: {

  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    submit() {
      this.loading = true;

      login({
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$root.isAuthenticated = true;
          this.$root.currentUser = res;
          this.$router.push('Dashboard');
        })
        .catch(err => {
          console.log(err);
          // Display Error
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
