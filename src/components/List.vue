<template>
  <v-col cols=12>
    <v-treeview
        activatable
        :items="personasList"
    ></v-treeview>
  </v-col>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "List",
  computed: {
    ...mapGetters(['personasList'])
  }
}
</script>

<style scoped>

</style>
