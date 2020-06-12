<template>
  <q-card >
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Project Name</div>
      <div class="text-subtitile2">Project Status</div>    
    </q-card-section>
    <q-card-section>
        <div class="text-subtitle1"> Project Description</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="positive">Scribble</q-btn>
      <q-btn flat color="primary">Edit</q-btn>
      <q-btn flat color="negative">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ProjectCard extends Vue {
  

}
</script>

<style>

</style>