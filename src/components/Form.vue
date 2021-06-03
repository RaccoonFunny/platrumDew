<template>
  <v-col cols="6">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Фио"
          required
      ></v-text-field>

      <v-text-field
          v-model="phone"
          :rules="phoneRules"
          label="Телефон"
          required
      ></v-text-field>

      <v-select
          v-model="boss"
          :items="personas"
          label="Начальник"
          required
      ></v-select>

      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Добавить
      </v-btn>
    </v-form>
  </v-col>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Form",
  data: function () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'ФИО обязательно',
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'телефонный номер обязателен',
        v => (v && v.length === 11) || 'Телефонный номер должен быть 11 значным',
      ],
      boss: null,
      checkbox: false,
    }
  },

  computed: {
    ...mapGetters(["personas"]),
  },

  methods: {
    ...mapActions(["addPersona"]),
    validate() {
      if(this.$refs.form.validate()) {
        let newPersona = {
          boss: {
            name: this.boss
          },
          guy: {
            name: 'ФИО: ' + this.name + ", телефон: " + this.phone
          }
        };

        this.$emit('rerenderList')

        console.log(newPersona);
        this.addPersona(newPersona);

        this.name = this.phone = this.boss = '';
      }
    },
  },
}
</script>

<style scoped>

</style>
