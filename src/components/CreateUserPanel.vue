<template>
    <b-form @onClick="onClick">
      <b-container class="card-container more-top-margin">
        <b-row>
          <b-col cols="12">
            <h1>Crear nuevo usuario</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12"  md="6">
              <b-form-group id="nameGroup"
                      label="Nombre:"
                      label-for="nameInput">
                <b-form-input id="nameInput"
                        type="text"
                        v-model="newUser.name"
                        name="name"
                        placeholder="Nombre"
                        class="full-width">
                </b-form-input>
              </b-form-group>
          </b-col>
          <b-col  cols="12" md="6">
            <b-form-group id="surnameGroup"
              label="Apellidos:"
              label-for="surnameInput">
              <b-form-input id="surnameInput"
                type="text"
                v-model="newUser.surname"
                name="surname"
                placeholder="Apellidos"
                      class="full-width">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12"  md="6">
            <b-form-group id="passwordGroup"
              label="Contraseña:"
              label-for="passwordInput">
              <b-form-input id="passwordInput"
                type="password"
                v-model="newUser.password"
                name="password"
                placeholder="Contraseña"
                      class="full-width">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12"  md="6">
            <b-form-group id="dniGroup"
                    label="DNI/NIE:"
                    label-for="dniInput">
              <b-form-input id="dniInput"
                      type="text"
                      v-model="newUser.dni"
                      name="dni"
                      placeholder="DNI/NIE"
                      class="full-width">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <h2>Datos de contacto</h2>
        <b-row>
          <b-col cols="12"  md="6">
            <b-form-group id="emailGroup"
                    label="Correo electrónico:"
                    label-for="emailInput">
              <b-form-input id="emailInput"
                      type="text"
                      v-model="newUser.email"
                      name="email"
                      placeholder="Correo electrónico"
                      class="full-width">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12"  md="6">
            <b-form-group id="phoneGroup"
                    label="Teléfono:"
                    label-for="phonelInput">
              <b-form-input id="phoneInput"
                      type="text"
                      v-model="newUser.phone"
                      name="phone"
                      placeholder="Teléfono"
                      class="full-width">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group id="addressGroup"
                    label="Dirección:"
                    label-for="addressInput">
              <b-form-input id="addressInput"
                      type="text"
                      v-model="newUser.address"
                      name="address"
                      placeholder="Dirección"
                      class="full-width">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
          <b-row>
            <b-col cols="12"  md="6">
              <b-form-group id="ageGroup"
                    label="Edad:"
                    label-for="ageInput">
                <b-form-input id="ageInput"
                      type="text"
                      v-model="newUser.age"
                      name="age"
                      placeholder="Edad"
                      class="full-width">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12"  md="6">
              <b-form-group id="genderGroup"
                    label="Género:"
                    label-for="genderInput">
                <b-form-input id="genderInput"
                      type="text"
                      v-model="newUser.gender"
                      name="gender"
                      placeholder="Género"
                      class="full-width">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
      </b-container>
      <b-container class="more-top-margin">
          <b-row>
            <b-col cols="12"  md="6">
              <b-button type="button" v-on:click="createUser()" variant="primary" class="full-width">Crear usuario</b-button>
            </b-col>
            <b-col cols="12"  md="6">
              <b-button type="button" v-on:click="cancelCreateUser()" variant="outline-danger" class="full-width">Cancelar</b-button>
            </b-col>
        </b-row>
      </b-container>
    </b-form>
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
      this.$http.post('http://api.solidarios.coredumped.es/user/register',
        this.newUser,
        {
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Beacon ' + this.token
        })
        .then(response => {
          this.$router.push({
            name: 'usersPanel',
            params: { token: this.token }
          })
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
input {
    width: 20vw;
}

button {
    width: 10vw;
}

</style>
