<template>
    <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="text-h6 q-mt-md q-mb-md">Scribble Project</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="close"/>
        </q-toolbar>
        <q-card-section>
            <q-form class="q-gutter-md">
                <q-input clearable outlined v-model="project.name" label="Project Name" />
                <q-input type="textarea" clearable outlined v-model="project.description" label="Project Description" />
                <q-toggle v-show="edit" v-model="project.completed" label="Mark project as completed" />
                <q-separator/>
                <div> 
                    <q-btn v-if="edit" class="q-mr-xs" color="primary" @click="update" v-close-popup>Update</q-btn>
                    <q-btn v-else class="q-mr-xs" color="primary" @click="create" v-close-popup>Create</q-btn>
                    <q-btn flat color="negative">Reset</q-btn>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

import notify from '../NotifyUtil'

import { ProjectApi } from './../openapi/api'

import { ProjectPost, Project } from '../openapi'
 

@Component
export default class ProjectForm extends Vue {
    @Prop(Boolean) readonly edit: boolean | undefined
    projectApi = new ProjectApi()
    project: Project = {
        name: '',
        description: '',
        completed: false
    }

    @Watch('$route', { immediate: true, deep: true })
    router(route: Route) {
        if(route.name == 'editProject') {
            const id = Number(route.params.id)
            notify('Scribbling', "Finding Project", "info", async () => {
            const response = await this.projectApi.readProject(id)
            this.project = response.data
        });
        }
    }
    
    close() {
        this.$router.replace("/")
    }

    async create() {
        notify('Scribbling', "Creating Project - "+this.project.name, "info", async () => {
            const project = { name: this.project.name, description: this.project.description }
            const response = await this.projectApi.createProject(project)
            this.$store.commit('project/addProject', response.data)
            this.close()
        });
    }

    async update() {
        notify('Scribbling', "Editing Project - "+this.project.name, "info", async () => {
            const id = Number(this.project.id)
            const project = { name: this.project.name, description: this.project.description, completed: this.project.completed }
            const response = await this.projectApi.updateProject(id, project)
            this.$router.replace("/projects/reload")
        });
    }


}
</script>

<style>

</style>