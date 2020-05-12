// //this shit is just pasted in dawg i dont rememeber fuckin vuex
// export const state = () => ({
//   list: []
// })

// export const actions = {
//   async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
//     if (!authUser) {
//       await dispatch('cleanupAction')  
//       return
//     }  
//     // you can request additional fields if they are optional (e.g. photoURL)
//     const { uid, email, emailVerified, displayName, photoURL } = authUser  
//     commit('SET_USER', {
//       uid,
//       email,
//       emailVerified,
//       displayName,
//       photoURL, // results in photoURL being undefined for server auth
//       // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
//       isAdmin: claims.custom_claim
//     })
//   },
//   async nuxtServerInit({ dispatch, commit }, { res }) {
//     if (res && res.locals && res.locals.user) {
//       const { allClaims: claims, ...authUser } = res.locals.user
  
//       await dispatch('onAuthStateChangedAction', {
//         authUser,
//         claims
//       })
  
//       // or
  
//       commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
//     }
//   }
// }
// export const mutations = {
//   ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
//     // you can request additional fields if they are optional (e.g. photoURL)
//     const { uid, email, emailVerified, displayName, photoURL } = authUser
    
//     state.authUser = {
//       uid,
//       displayName,
//       email,
//       emailVerified,
//       photoURL: photoURL || null, // results in photoURL being null for server auth
//       // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
//       isAdmin: claims.custom_claim
//     }
//   }
// }