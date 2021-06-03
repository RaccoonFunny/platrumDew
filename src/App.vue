<template>
  <div>
    <v-app>
      <v-row align-content="center" justify="center">
        <v-card>
          <v-btn
              color="primary"
              block
              @click="addForm = !addForm"
          >
            {{btnMessage}}
          </v-btn>
          <List :key="rerenderList"/>
        </v-card>
        <Form v-if="addForm" @rerenderList="rerenderList = !rerenderList"/>
      </v-row>
    </v-app>
  </div>
</template>

<script>

import List from "@/components/List";
import Form from "@/components/Form";

export default {
  name: 'App',

  components: {
    Form,
    List
  },

  computed: {
    btnMessage: function (){
      return this.addForm ? "закрыть" : "добавить";
    }
  },

  data: () => ({
    rerenderList: 0,
    addForm: false,
  }),


};
</script>

<style scoped>

</style>
