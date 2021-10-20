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
              md="4"
            >
              <v-text-field
                v-model="user.first_name"
                label="First name"
                required
                :disabled="loading"
                :rules="[ validations.first_name ]"
              />
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="user.last_name"
                label="Last name"
                required
                :disabled="loading"
                :rules="[ validations.last_name ]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                :disabled="loading"
                required
                :rules="[ validations.password ]"
              />
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="verifyPass"
                label="Verify Password"
                type="password"
                :disabled="loading"
                required
                :rules="[ validations.verifyPass() ]"
              />
            </v-col>
          </v-row>
          <v-btn
            class="mr-4"
            type="submit"
            large
            color="primary"
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
export default {
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        password: '',
        email: '',
      },
      verifyPass: '',
      loading: false,
      valid_form: false,
    }
  },
  computed: {
    validations() {
      return {
        password: () => this.user.password.length > 0 ? true : 'Password is required',
        verifyPass: () => this.user.password == this.verifyPass ? true : 'Passwords must match',
        email: () => this.user.email.length > 0 ? true : 'Email is required',
        first_name: () => this.user.first_name.length > 0 ? true : 'First name is required',
        last_name: () => this.user.last_name.length > 0 ? true : 'Last name is required'
      }
    }
  },
  methods: {
    submit() {
      this.loading = true;
      this.$http.post('auth/register', this.user)
        .then(res => {
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
  }
}
</script>
<style lang="scss" scoped>
</style>
