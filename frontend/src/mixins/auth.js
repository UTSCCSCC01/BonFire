export default {
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
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
    saveUser(res) {
      console.log('login2');
      localStorage.setItem('token', res.data.token.accessToken);
      localStorage.setItem('user', res.data);
    },
    login() {
      console.log('login');
      this.loading = true;
      this.$http.post('auth/login', this.user)
      .then(this.saveUser)
      .then(() => {
          console.log('login3');
          this.$router.push('Dashboard').catch(() => { });
        })
        .catch(err => {
          console.log('login4');
          this.$notify({
            type: 'error',
            title: 'Error',
            text: err?.response?.data?.message || 'Unknown Error'
          });
          console.error(err);
        })
        .finally(() => {
          console.log('login5');
          this.loading = false;
        });
    },
    register() {
      this.loading = true;
      this.$http.post('auth/register', this.user)
        .then(this.saveUser)
        .then(() => {
          this.$router.push('Dashboard').catch(() => { });
        })
        .catch(err => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: err?.response?.data?.message || 'Unknown Error'
          });
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
}
