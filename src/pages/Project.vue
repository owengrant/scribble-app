<template>
  <q-page>
    <div class="row">
      <div class="col-xs-2 text-right q-mt-lg">
        <q-btn  fab icon="add" color="positive" label="Create" @click="showCreate = true"/>
      </div>
      <div class="q-mt-lg q-mb-md offset-xs-1 col-xs-6">
        <q-input v-model="filter" label="Search">
          <template v-slot:append>
            <q-icon v-if="filter === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="filter = ''" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center">
      <project-card 
       class="col-xs-3 q-ma-md" 
       v-for="(project, i) in $store.state.project.projects"
       :key="i"
       :project="project"
      />
    </div>
    <q-dialog v-model="showCreate" persistent transition-show="flip-down" transition-hide="flip-up">
      <project-form style="width: 600px"/>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { ProjectApi } from './../openapi/api'

import ProjectCard  from './../components/ProjectCard.vue'
import ProjectForm  from './../components/ProjectForm.vue'

@Component({
  components: {
    ProjectCard,
    ProjectForm
  }
})
export default class Project extends Vue {
  projectApi = new ProjectApi()
  showCreate = false
  filter = ''
  projects = new Array<Project>()    
  
  async mounted() {
    const response = await this.projectApi.readProjects()
    this.$store.commit('project/replaceProjects', response.data)
  }

}
</script>
