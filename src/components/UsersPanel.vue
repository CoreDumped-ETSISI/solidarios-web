<template>
  <div class="volunteerPanel">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Solidarios</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-on:click="loadVolunteers()">Voluntarios</b-nav-item>
          <b-nav-item v-on:click="loadUsers()">Usuarios</b-nav-item>
          <b-nav-item v-on:click="loadEvents()">Eventos</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input v-model="search" size="sm" class="mr-sm-2" type="text" placeholder="Buscar"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br />
    <!--Modal to show user's info-->
    <div id="my-modal" class="modal fade">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Información de usuario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Name: {{ name }}</p>
          <p>Apellidos: {{ surname }}</p>
          <p>DNI: {{ dni }}</p>
          <p>Email: {{ email }}</p>
          <p>Dirección: {{ address }}</p>
          <p>Edad: {{ age }}</p>
          <p>Género: {{ gender }}</p>
          <p>Descripción: {{ description }}</p>
          <p>Avatar: {{ avatarImage }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
    </div>

    <b-table show-empty striped hover :items="filteredList" :fields="fields">
    </b-table>
    <fab
    :position="position"
    :actions="fabActions"
    :main-icon="main_icon"
    :icon-size="icon_size"
    @loadUsers="loadUsers"
    @createUser="createUser"></fab>
  </div>
</template>

<script>
import fab from 'vue-fab'

export default {
  name: 'UsersPanel',
  components: {
    fab
  },
  data () {
    return {
      name: '',
      surname: '',
      dni: '',
      email: '',
      phone: '',
      address: '',
      age: '',
      gender: '',
      description: '',
      avatarImage: '',
      search: '',
      position: 'bottom-right',
      main_icon: 'settings',
      icon_size: 'large',
      fabActions: [
        {
          name: 'loadUsers',
          icon: 'cached'
        },
        {
          name: 'createUser',
          icon: 'add'
        }
      ],
      newUser: {

      },
      users: [],
      token: this.$route.params.token,
      fields: {
        name: {
          label: 'Nombre'
        },
        surname: {
          label: 'Apellidos'
        },
        dni: {
          label: 'DNI'
        },
        address: {
          label: 'Dirección'
        },
        age: {
          label: 'Edad'
        },
        gender: {
          label: 'Género'
        },
        email: {
          label: 'Correo'
        },
        phone: {
          label: 'Teléfono'
        }
      }
    }
  },

  computed: {
    filteredList () {
      return this.users.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  created () {
    this.loadUsers()
  },
  methods: {

    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },

    loadUsers () {
      const httpOptions = {
        'Authorization': 'Beacon ' + this.token,
        'Access-Control-Allow-Origin': '*'
      }
      this.$http.get('http://api.solidarios.coredumped.es/user/list?role=needer', {headers: httpOptions}).then(response => {
        this.users = response.data
      }, errorResponse => {
        console.log('Error on request')
      })
    },

    loadVolunteers () {
      this.$router.push({
        name: 'volunteersPanel',
        params: { token: this.token }
      })
    },

    loadEvents () {
      this.$router.push({
        name: 'eventsPanel',
        params: { token: this.token }
      })
    },

    createUser () {
      this.$router.push({
        name: 'createNewUser',
        params: { token: this.token }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
