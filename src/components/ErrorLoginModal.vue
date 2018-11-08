<template>
<transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">
        <header
          class="modal-header"
          id="modalTitle">
          <slot name="header">
            ¡Vaya! Ha habido un problema.
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription">

          <slot name="body">
            Hemos intentado conectarte en la aplicación, <br>
            pero ha ocurrido un problema durante el proceso.
          </slot>
        </section>
        <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal">
              Cerrar
            </button>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'modal',

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

.modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

.modal-backdrop {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    position: relative;
    top: 0%;
    right: 0%;
    align-self: center;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
