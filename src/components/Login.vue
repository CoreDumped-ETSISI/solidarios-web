<template>
  <div class="login" id="login">
    <b-container>
      <b-row align-h="center" align-v="center">
        <img class="logo" src="/static/logo.png">
      </b-row>
      <b-row align-v="center" align-h="start">
      <b-col sm="12" md="6" offset-md="3">
    <b-form @submit="onSubmit">
      <b-form-group id="emailGroup" label="Correo electrónico:" label-for="emailInput" description="Introduce tu correo electrónico.">
        <b-form-input id="emailInput" type="email" v-model="form.email" required placeholder="Introduce tu correo electrónico">
        </b-form-input>
      </b-form-group>
            <b-form-group id="passwordGroup"
                    label="Contraseña:"
                    label-for="passwordInput"
                    description="Introduce tu contraseña.">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.text"
                      required
                      placeholder="Introduce tu contraseña.">
        </b-form-input>
      </b-form-group>
      <b-form-group id="checkLoginGroup">
        <b-form-checkbox-group v-model="form.checked" id="checksLogin">
          <b-form-checkbox value="recordar">Recuérdame</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Entrar</b-button>
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
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true,
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
          .then(
            response => {
              this.$router.push({
                name: 'volunteerPanel',
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
