
export function addProject (state, payload) {
    state.projects.push(payload)
}

export function replaceProjects (state, payload) {
    state.projects = payload
}

export function deleteProject (state, payload) {
    state.projects = state.projects.filter(p => p.id != payload.id)
}
