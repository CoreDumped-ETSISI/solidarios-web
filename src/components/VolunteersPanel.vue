<template>
  <div class="eventsPanel">
    <b-navbar toggleable="md" type="dark" variant="primary">

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
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Buscar"/>
        <b-button size="sm" class="my-2 my-sm-0 white-bg" type="submit" variant="outline-success" >Buscar</b-button>
      </b-nav-form>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<br />
<b-table show-empty striped hover :items="filteredList" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: 'UsersPanel',
  components: {
  },
  data () {
    return {
      search: '',
      volunteers: [],
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
      return this.volunteers.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created () {
    this.loadVolunteers()
  },
  methods: {

    loadUsers () {
      this.$router.push({
        name: 'usersPanel',
        params: { token: this.token }
      })
    },

    loadVolunteers () {
      const httpOptions = {
        'Authorization': 'Beacon ' + this.token,
        'Access-Control-Allow-Origin': '*'
      }
      this.$http.get('http://api.solidarios.coredumped.es/user/list?role=volunteer', {headers: httpOptions}).then(response => {
        this.users = response.data
      }, errorResponse => {
        console.log('Error on request')
      })
    },

    loadEvents () {
      this.$router.push({
        name: 'eventsPanel',
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
