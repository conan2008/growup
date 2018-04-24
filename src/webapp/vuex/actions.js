import request from 'axios'

request.defaults.baseURL = 'http://localhost:8081/'

export const getUsers = ({ commit, state }) => {
  return request.get('user/11').then((response) => {

    // if (response.statusText === 'OK') {
      commit('GET_USERS', response.data)
    // }
  }).catch((error) => {
    console.log(error)
  })
}
