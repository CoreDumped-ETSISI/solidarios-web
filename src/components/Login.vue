<template>
  <div class="login" id="login">
    <img class="logo" src="/static/logo.png">
    <br />
    <modal
      v-show="isModalVisible"
      @close="closeModal"/>
    <div class="loginForm">
      <input type="text" v-model="input.email" name="email" placeholder="Correo electrónico">
      <input type="password" v-model="input.password" name="password" placeholder="Contraseña">
      <button type="button" v-on:click="login()">Login</button>
    </div>
    <footer>Proudly developed by CoreDumped. All rights reserved. ©2018</footer>
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
          .then(
            response => {
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.logo {
  margin: 5vh;
}

.loginForm {
  padding: 5px 0;
  background: #42b983;
  border-radius: 2px;
}
</style>
