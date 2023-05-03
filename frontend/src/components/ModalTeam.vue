<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    modelValue:{
      type: String,
      required: true
    },
    headerModal: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('cancel')
    },
    AddData() {
      this.$emit('confirm')
    },
    updateData(){
      this.$emit('update')
    }
  },
}
</script>

<template>
  <div class="modal-popup-backdrop" v-show="isShow" @click="closeModal">
    <div class="modal-popup" @click.stop>
      <div class="modal-popup__wrapper">
        <div class="modal-popup__header" style="color: #42b983;">
          <div class="" style="display: flex; align-items: center; margin: 10px auto; max-width: 400px;">
            <img src="../../football_icon.png" alt="" width="32" height="32">
            <h3 style="display: inline; margin: 0; margin-left: 30px;">{{ headerModal }}</h3>
          </div>
        </div>
        <hr />
        <div class="modal-popup__main">
          <input
          id="text-input"
          maxlength="30"
          placeholder="Введите название команды (макс. 30 символов)"
          type="text"
          @input="$emit('update:modelValue', $event.target.value)">
        </div>

        <div class="modal-popup__footer">
          <slot name="actions" :cancel="closeModal" :confirm="confirmModal">
            <button style="margin: 10px;" class="modal-popup__button" @click="closeModal">Отмена</button>
            <button style="margin: 10px;" class="modal-popup__button" @click="AddData" v-if="action === 'add'">Добавить</button>
            <button style="margin: 10px;" class="modal-popup__button" @click="updateData" v-if="action === 'update'">Подтвердить</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9001;
}

.modal-popup {
  max-width: 500px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  padding: 20px;
  text-align: center;
}


.modal-popup__wrapper {
  display: flex;
  flex-direction: column;
}
.modal-popup__main {
  max-width: 100%;
}
hr {
  width: 100%;
}
input {
  margin: 10px 0;
  width: 465px;
  padding: 10px 15px;
  border: 1px solid #656565;
}
</style>