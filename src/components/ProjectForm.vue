<template>
    <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="text-h6 q-mt-md q-mb-md">Create Project</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
            <q-form class="q-gutter-md">
                <q-input clearable outlined v-model="projectPost.name" label="Project Name" />
                <q-input type="textarea" clearable outlined v-model="projectPost.description" label="Project Description" />
                <q-toggle v-show="edit" v-model="completed" label="Mark project as completed" />
                <q-separator/>
                <div> 
                    <q-btn class="q-mr-xs" color="primary" @click="create" v-close-popup>Create</q-btn>
                    <q-btn flat color="negative">Reset</q-btn>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import notify from '../NotifyUtil'

import { ProjectApi } from './../openapi/api'

import { ProjectPost } from '../openapi'
 

@Component
export default class ProjectForm extends Vue {
    @Prop(Boolean) readonly edit: boolean = false
    projectApi = new ProjectApi()
    projectPost: ProjectPost = {
        name: '',
        description: ''
    }
    completed = false

    async create() {
        notify('Scribbling', "Creating Project - "+this.projectPost.name, "info", async () => {
            const response = await this.projectApi.createProject(this.projectPost)
            this.$store.commit('project/addProject', response.data)
        });
    }

}
</script>

<style>

</style>