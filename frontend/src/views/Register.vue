<template>
  <div class="register">
    <v-main>
      <v-form v-model="valid_form">
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="user.username"
                label="Username"
                required
                :rules="[ validations.username ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.firstname"
                label="First name"
                required
                :rules="[ validations.firstname ]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="user.lastname"
                label="Last name"
                required
                :rules="[ validations.lastname ]"
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
import { register } from '@/utils/axios';

export default {
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        password: '',
        username: '',
      },
      verifyPass: '',
      loading: false,
      valid_form: false,
    }
  },
  methods: {
    submit() {
      if (!this.validUser) {
        // Growl
      } else {
        this.loading = true;
        register(this.user)
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
        username: () => this.user.username.length > 0 ? true : 'Username is required',
        firstname: () => this.user.firstname.length > 0 ? true : 'First name is required',
        lastname: () => this.user.lastname.length > 0 ? true : 'Last name is required'
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
