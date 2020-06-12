<template>
    <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="text-h6 q-mt-md q-mb-md">Create Project</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
            <q-form class="q-gutter-md">
                <q-input clearable outlined v-model="name" label="Project Name" />
                <q-input type="textarea" clearable outlined v-model="description" label="Project Description" />
                <q-toggle v-model="completed" label="Mark project as completed" />
                <q-separator/>
                <div> 
                    <q-btn class="q-mr-xs" color="primary">Create</q-btn>
                    <q-btn flat color="negative">Reset</q-btn>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';


@Component
export default class ProjectForm extends Vue {
    name = ""
    description = ""
    completed = false
}
</script>

<style>

</style>