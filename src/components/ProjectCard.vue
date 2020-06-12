<template>
  <q-card >
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ project.name }}</div>
      <div class="text-subtitile2">Project Status</div>    
    </q-card-section>
    <q-card-section>
        <div class="text-subtitle1">{{ project.description }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="positive">Scribble</q-btn>
      <q-btn flat color="primary">Edit</q-btn>
      <q-btn flat color="negative" @click="deleteProject">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { ProjectApi, Project } from './../openapi'

@Component
export default class ProjectCard extends Vue {
  @Prop(Object) readonly project: Project | undefined
  projectApi = new ProjectApi()
 
  async deleteProject() {
    if(this.project) {
      const id = Number(this.project.id)
      const response = await this.projectApi.deleteProject(id)
      this.$store.commit('project/deleteProject', {id: id})
    }
  }

}
</script>

<style>

</style>