<template>
  <q-card >
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ project.name }}</div>
      <div class="text-subtitile2">Project Status</div>    
    </q-card-section>
    <q-card-section>
        <div class="text-subtitle1">{{ project.description }}</div>
    </q-card-section>
    <q-space />
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="positive">Scribble</q-btn>
      <q-btn flat color="primary" @click="edit">Edit</q-btn>
      <q-btn flat color="negative" @click="deleteProject">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { ProjectApi, Project } from './../openapi'
import notify from '../NotifyUtil';

@Component
export default class ProjectCard extends Vue {
  @Prop(Object) readonly project: Project | undefined
  projectApi = new ProjectApi()
 
  edit() {
    if(this.project) {
      const id = Number(this.project.id)
      this.$router.replace("/projects/"+id+"/edit")
    }
  }

  async deleteProject() {
    if(this.project) {
      const name = this.project.name
      const id = Number(this.project.id)
      this.$q.dialog({
        title: 'Delete Project - '+name,
        message: 'Are you sure you want to delete this project and all associated resources?\nThis action cannot be undone.',
        cancel: true,
        persistent: true,
        
      }).onOk(() => {
        notify(
          'Scribbling',
          'Deleting Project - '+name,
          'warning',
          async () => {
            const response = await this.projectApi.deleteProject(id)
            this.$store.commit('project/deleteProject', {id: id})
          }
        )
      })
    }
  }

}
</script>

<style>

</style>