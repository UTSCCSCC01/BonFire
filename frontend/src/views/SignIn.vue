<template>
  <div class="signin">
    <form class="login" @submit.prevent="submit">
      <div class="form-group">
        <label>Username</label>
        <input required v-model="username" type="username" class="form-control" placeholder="Enter username">
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input required v-model="email" type="email" class="form-control" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input required v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <hr>
    </form>
  </div>
</template>
<script>
import { login } from '@/utils/axios';

export default {
  components: {},
  props: {

  },
  data() {
    return {
      email: '',
      password: '',
      username: '',
      loading: false,
    }
  },
  methods: {
    submit() {
      this.loading = true;

      login({
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
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
