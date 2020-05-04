import Vuex from 'vuex'
import firebase, {auth, GoogleProvider} from '@/services/fireinit.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      }
    },
    actions: {
      signInWithEmail({commit}, payload){
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(function(result) {
            console.log("user", result.user.tenantId) 
          }).catch(function(error) {
            // Handle error.
          });
      },
      autoSignIn ({commit}, payload) {
        console.log("autosignin")
        commit('setUser', payload)
      },

      signInWithGoogle ({commit}) {
        return new Promise((resolve, reject) => {
          console.log("sign in with google")
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },

      signOut ({commit}) {
        auth.signOut().then(() => {
          commit('setUser', null)
        }).catch(err => console.log(error))
      }
    }
  })
}

export default createStore
