<template>
  <div class="login" id="login">
    <b-container>
      <b-row align-h="center" align-v="center">
        <img class="logo" src="/static/logo.png">
      </b-row>
      <b-row align-v="center" align-h="start">
      <b-col sm="12" md="6" offset-md="3">
    <b-form @submit="onSubmit">
      <b-form-group label="Correo electrónico:">
        <b-form-input type="email" v-model="input.email" required placeholder="Introduce tu correo electrónico">
        </b-form-input>
      </b-form-group>
            <b-form-group label="Contraseña:">
        <b-form-input type="password" v-model="input.password" required placeholder="Introduce tu contraseña.">
        </b-form-input>
      </b-form-group>
      <b-button v-on:click="login" variant="primary">Entrar</b-button>
    </b-form>
    </b-col>
    </b-row>
    </b-container>
    <modal
      v-show="isModalVisible"
      @close="closeModal"/>
    <b-container class="info-core">Proudly developed by <a href="https://coredumped.es/">>Core Dumped_</a>. All rights reserved. ©2018</b-container>
  </div>
</template>

<script>
import modal from './ErrorLoginModal.vue'

export default {
  name: 'Login',
  components: {
    modal
  },
  data () {
    return {
      isModalVisible: false,
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    login () {
      if (this.validateEmail() && this.validatePassword()) {
        this.$http
          .post('http://api.solidarios.coredumped.es/user/login/', this.input)
          .then(response => {
            this.$router.push({
              name: 'usersPanel',
              params: { token: response.body.token }
            })
          },
          errorResponse => {
            this.showModal()
            console.log(this.errorResponse)
          }
          )
      }
    },

    validateEmail () {
      return true
    },

    validatePassword () {
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.logo {
  margin: 5vh;
  width: 75vh;
}

.info-core{
  margin-top: 25px;
  font-family: monospace;
  font-size: 0.9em;
  text-align: center;
}
</style>
