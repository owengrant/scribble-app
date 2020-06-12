
export function addProject (state, payload) {
    state.projects.push(payload)
}

export function replaceProjects (state, payload) {
    state.projects = payload
}
