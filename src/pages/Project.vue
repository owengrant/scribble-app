<template>
  <q-page>
    <div class="row">
      <div class="col-xs-2 text-right q-mt-lg">
        <q-btn  fab icon="add" color="positive" label="Create" @click="$router.replace('/projects/create')"/>
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
    <q-dialog v-model="showEdit" persistent transition-show="flip-down" transition-hide="flip-up">
      <project-form :edit="true" style="width: 600px"/>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

import { ProjectApi } from './../openapi/api'

import ProjectCard  from './../components/ProjectCard.vue'
import ProjectForm  from './../components/ProjectForm.vue'
import notify from '../NotifyUtil';

@Component({
  components: {
    ProjectCard,
    ProjectForm
  }
})
export default class Project extends Vue {
  projectApi = new ProjectApi()
  showCreate = false
  showEdit = false
  filter = ''
  projects = new Array<Project>()    
  
  @Watch('$route', { immediate: true, deep: true })
  router(route: Route) {
    if(route.name == 'createProject') {
      this.showCreate = true
    }
    else if(route.name == 'editProject') {
      const id = route.params.id
      this.showEdit = true
    }
    else if(route.name == 'refreshProject') {
      this.refresh()
      this.$router.replace("/")
    }
    else if(route.name == 'root') {
      this.showCreate = false
      this.showEdit = false
    }
  }
  
  async mounted() {
    this.refresh();
  }

  async refresh() {
    notify("Please with while we gather your Scribbles", "Loading Projects", "info", async () => {
      const response = await this.projectApi.readProjects()
      this.$store.commit('project/replaceProjects', response.data)
    })
  }

  destroy() {

  }

}
</script>
