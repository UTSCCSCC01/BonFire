<template>
  <div class="register">
    <form class="register" @submit.prevent="submit">
      <div class="form-group">
        <label>Username</label>
        <input required v-model="user.username" type="username" class="form-control" placeholder="Enter username">
        {{ validations.username.valid() ? '' : validations.username.message  }}
      </div>
      <div class="form-group">
        <label>First Name</label>
        <input v-model="user.first_name" class="form-control" placeholder="Enter first name">
        {{ validations.first_name.valid() ? '' : validations.first_name.message  }}
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input v-model="user.last_name" class="form-control" placeholder="Enter last name">
        {{ validations.last_name.valid() ? '' : validations.last_name.message  }}
      </div>
      <div class="form-group">
        <label>Password</label>
        <input required v-model="user.password" type="password" class="form-control" placeholder="Password">
        {{ validations.password.valid() ? '' : validations.password.message  }}
      </div>
      <div class="form-group">
        <label>Verify Password</label>
        <input required v-model="verifyPass" type="password" class="form-control" placeholder="Password">
        {{ validations.verifyPass.valid() ? '' : validations.verifyPass.message  }}
      </div>
      <button type="submit" :disabled="loading || !validUser">Login</button>
      <hr>
    </form>
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
    validUser() {
      return Object.values(this.validations).every(v => v.valid());
    },
    validations() {
      return {
        password: {
          message: 'Password is required',
          valid: () => this.user.password.length > 0
        },
        verifyPass: {
          message: 'Passwords must match',
          valid: () => this.user.password == this.verifyPass
        },
        username: {
          message: 'Username is required',
          valid: () => this.user.username.length > 0
        },
        first_name: {
          message: 'First name is required',
          valid: () => this.user.first_name.length > 0
        },
        last_name: {
          message: 'Last name is required',
          valid: () => this.user.last_name.length > 0
        },
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
