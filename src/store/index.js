import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        personas: JSON.parse(window.localStorage.getItem('personas')) || [],
        actualId: window.localStorage.getItem('actualId') || 0,
    },
    getters: {
        personasList: state => state.personas,
        personas: state => {
            let personasNames = [];

            function recursiveSearchNames(persona) {
                personasNames.push(persona.name);
                if (persona.children) {
                    for (let i = 0; i < persona.children.length; i++)
                        recursiveSearchNames(persona.children[i])
                }
            }

            for (let i = 0; i < state.personas.length; i++) {
                recursiveSearchNames(state.personas[i])
            }

            return personasNames
        }
    },
    mutations: {
        setPersona(state, persona) {
            let match = false

            function searchBoss(boss, persona) {
                if (!match) {
                    console.log('boss:');
                    console.log(boss.name);
                    if (boss.name === persona.boss.name) {
                        if (typeof boss.children === "undefined") boss.children = [];
                        boss.children.push(persona.guy)
                        match = true
                        return
                    }
                    if (typeof boss.children !== "undefined") {
                        for (let i = 0; i < boss.children.length; i++) {
                            console.log(boss.name + ' его дети: ' + boss.children.length)
                            searchBoss(boss.children[i], persona)
                        }
                    }
                }
            }

            persona.guy.id = state.actualId;
            state.actualId++;

            if (persona.boss.name) {
                for (let i = 0; i < state.personas.length; i++) {
                    searchBoss(state.personas[i], persona);
                }
            } else {
                state.personas.push(persona.guy)
            }

            window.localStorage.setItem('personas', JSON.stringify(state.personas));
            window.localStorage.setItem('actualId', state.actualId);
        }
    },
    actions: {
        addPersona(ctx, persona) {
            ctx.commit('setPersona', persona)
        }
    },
    modules: {}
})
