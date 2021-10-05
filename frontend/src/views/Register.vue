<template>
  <div class="register">
    <v-main>
      <v-form v-model="valid_form" v-on:submit="submit">
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="user.email"
                label="email"
                required
                :rules="[ validations.email ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.first_name"
                label="First name"
                required
                :rules="[ validations.first_name ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.last_name"
                label="Last name"
                required
                :rules="[ validations.last_name ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                required
                :rules="[ validations.password ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="verifyPass"
                label="Verify Password"
                type="password"
                required
                :rules="[ validations.verifyPass() ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            class="mr-4"
            type="submit"
            :disabled="!valid_form"
          >
            submit
          </v-btn>
        </v-container>
      </v-form>
    </v-main>
  </div>
</template>
<script>
import { register } from '@/plugins/axios';

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
  methods: {
    submit() {
      if (!this.valid_form) {
        // Growl
      } else {
        this.loading = true;
        register(this.user)
          .then(res => {
            this.isAuthenticated = true;
            this.currentUser = res;
          })
          .finally(() => {
            this.loading = false;
            // TODO: Route to the teacher/student page.
          });
      }
    }
  },
  computed: {
    validations() {
      return {
        password: () => this.user.password.length > 0 ? true : 'Password is required',
        verifyPass: () => this.user.password == this.verifyPass ? true : 'Passwords must match',
        email: () => this.user.email.length > 0 ? true : 'email is required',
        first_name: () => this.user.first_name.length > 0 ? true : 'First name is required',
        last_name: () => this.user.last_name.length > 0 ? true : 'Last name is required'
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
