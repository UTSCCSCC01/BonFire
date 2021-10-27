<template>
  <div class="register">
    <v-main>
      <v-form
        v-model="valid_form"
        @submit="submit"
      >
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="8"
            >
              <v-text-field
                v-model="user.email"
                label="Email"
                required
                :disabled="loading"
                :rules="[ validations.email ]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="8"
            >
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                required
                :disabled="loading"
                :rules="[ validations.password ]"
              />
            </v-col>
          </v-row>
          <v-btn
            class="mr-4"
            large
            color="primary"
            type="submit"
            :disabled="!valid_form || loading"
            :loading="loading"
          >
            submit
          </v-btn>
        </v-container>
      </v-form>
    </v-main>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  data() {
    return {
      user: {
        password: '',
        email: '',
      },
      loading: false,
      valid_form: false,
    }
  },
  computed: {
    validations() {
      return {
        password: () => this.user.password.length > 0 ? true : 'Password is required',
        email: () => this.user.email.length > 0 ? true : 'Email is required',
      }
    }
  },
  methods: {
    submit() {
      this.loading = true;
      this.$http.post('auth/login', this.user)
        .then(res => {
          Vue.prototype.$currentUser = res.data;
          localStorage.setItem('token', res.data.token.accessToken);
          this.$router.push('Dashboard');
        })
        .catch(err => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: err?.response?.data?.message || 'Unknown Error'
          });
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
