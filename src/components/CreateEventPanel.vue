<template>
    <div class="formContainer">
        <h1>Crear nuevo evento</h1>
      <input type="text" v-model="newEvent.name" name="name" placeholder="Nombre">
      <select v-model="newEvent.eType">
          <option v-for="eType in eTypes" v-bind:key="eType.name">
              {{eType.name}}
          </option>
      </select>
      <input type="password" v-model="newEvent.description" name="description" placeholder="Descripción">
      <input type="date" v-model="newEvent.date" name="date" placeholder="Date">
      <input type="text" v-model="newEvent.location" name="location" placeholder="Ubicación">
      <input type="number" v-model="newEvent.capacity" name="capacity" placeholder="Capacidad">
      <picture-input
        v-model="newEvent.photo"
        ref="pictureInput"
        @change="onChanged"
        @remove="onRemoved"
        :width="500"
        :removable="false"
        :height="500"
        accept="image/jpeg, image/png"
        buttonClass="ui button primary"
        :customStrings="{
            upload: '<h1>¡Súbela!</h1>',
            drag: 'Arrastra aquí tu imagen'}"
        ></picture-input>
    <div>
        <button type="button" v-on:click="createEvent()">Crear evento</button>
        <button type="button" v-on:click="cancelCreateEvent()">Cancelar</button>
      </div>
    </div>
</template>

<script>
import pictureInput from 'vue-picture-input'

export default {
  name: 'CreateEventPanel',
  components: {
    pictureInput
  },
  data () {
    return {
      eTypes: [],
      newEvent: {
        name: '',
        eType: '',
        description: '',
        date: '',
        location: '',
        capacity: '',
        participants: [],
        photo: ''
      },
      token: this.$route.params.token
    }
  },
  created () {
    this.getETypes()
  },

  methods: {

    getETypes () {
      const httpOptions = {
        'Authorization': 'Beacon ' + this.token,
        'Access-Control-Allow-Origin': '*'
      }
      this.$http.get('http://api.solidarios.coredumped.es/event', {headers: httpOptions}).then(response => {
        this.eTypes = response.data
      }, errorResponse => {
        console.log('Error on request')
      })
    },

    createEvent () {
      this.$http.post('http://api.solidarios.coredumped.es/event/',
        this.newEvent,
        {
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Beacon ' + this.token
        })
        .then(response => {
          this.$router.push({
            name: 'EventsPanel',
            params: { token: this.token }
          })
        }, errorResponse => {
          console.log('Error on request')
        })
    },

    cancelCreateEvent () {
      this.$router.push({
        name: 'eventsPanel',
        params: { token: this.token }
      })
    },

    onChanged () {
      if (this.$refs.pictureInput.file) {
        this.newEvent.photo = this.$refs.pictureInput.file
        console.log('New picture uploaded: ' + this.newEvent.photo)
      } else {
        console.log('Old browser. No support for FileReader API')
      }
    },

    onRemoved () {
      this.newEvent.photo = ''
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

select {
    width: 20vw;
}

button {
    width: 10vw;
}

</style>
