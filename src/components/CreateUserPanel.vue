<template>
    <div class="formContainer">
      <input type="text" v-model="newUser.name" name="name" placeholder="Nombre">
      <input type="text" v-model="newUser.surname" name="surname" placeholder="Apellidos">
      <input type="password" v-model="newUser.password" name="password" placeholder="Contraseña">
      <input type="text" v-model="newUser.dni" name="dni" placeholder="DNI/NIE">
      <input type="text" v-model="newUser.email" name="email" placeholder="Correo electrónico">
      <input type="text" v-model="newUser.phone" name="phone" placeholder="Teléfono">
      <input type="text" v-model="newUser.address" name="address" placeholder="Dirección">
      <input type="text" v-model="newUser.age" name="age" placeholder="Edad">
      <input type="text" v-model="newUser.gender" name="gender" placeholder="Género">
      <div>
        <button type="button" v-on:click="createUser()">Crear usuario</button>
        <button type="button" v-on:click="cancelCreateUser()">Cancelar</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CreateUserPanel',
  components: {
  },
  data () {
    return {
      newUser: {
        name: '',
        surname: '',
        password: '',
        dni: '',
        email: '',
        phone: '',
        address: '',
        age: '',
        gender: ''
      },
      token: this.$route.params.token
    }
  },
  methods: {

    createUser () {
      this.$http.post('http://api.solidarios.coredumped.es/user/register', {
        params: {
          'Authorization': 'Beacon ' + this.token,
          'Access-Control-Allow-Origin': '*'
        },
        body: this.newUser
      }).then(response => {
        console.log(response)
      }, errorResponse => {
        console.log('Error on request')
      })
    },

    cancelCreateUser () {
      this.$router.push({
        name: 'usersPanel',
        params: { token: this.token }
      })
    }
  }
}
</script>

<style scoped>

.formContainer {
    margin: 10vh;
}

.formContainer > * {
    display: block;
    margin: 2vh auto;
}

input {
    width: 20vw;
}

button {
    width: 10vw;
}

</style>
