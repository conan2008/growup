import request from 'axios'

request.defaults.baseURL = 'http://localhost:8081/'

export const getUsers = ({ commit, state }) => {
  return request.get('user/11').then((response) => {
    //???mmp, 这个statusText到底哪里设置的？  我console了一下，确实有这个鬼东西
    if (response.statusText === 'OK') {
      commit('GET_USERS', response.data)
    }
  }).catch((error) => {
    console.log(error)
  })
}
