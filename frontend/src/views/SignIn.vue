<template>
  <div class="register">
    <v-content>
      <v-form
        v-model="valid_form"
        @submit="login"
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
    </v-content>
  </div>
</template>
<script>
import Auth from '@/mixins/auth';

export default {
  mixins: [Auth],
}
</script>
<style lang="scss" scoped>

</style>
