// pages/register.vue

<template>
  <section class="section">
    <div class="container">
      <div>
        <h2 class="title has-text-centered">Register!</h2>

        <Notification :message="error" v-if="error"/>

        <form method="post" @submit.prevent="register">
          <div class="field">
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="10"
              label="Username"
              required
            ></v-text-field>
          </div>
          <div class="field">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </div>
          <div class="field">
            <div class="field">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                @click:append="show1 = !show1"
            ></v-text-field>
          </div>
          </div>
          <div class="control">
            <v-btn type="submit" class="mr-0" style="display:block;float:right;">Register</v-btn>
          </div>
        </form>
        <br>
        <br>
        <div class="has-text-centered" style="margin-top: 20px">
          Already got an account? <nuxt-link to="/sign-in">Login</nuxt-link>
        </div>
      </div>
    
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },
  middleware: 'guest',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password
        })

        await this.$auth.loginWith('local', {
          data: {
            identifier: this.email,
            password: this.password
          },
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>