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
    <b-table striped hover :items="filteredList" :fields="fields"></b-table>
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
