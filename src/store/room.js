import firebase from 'firebase'
import router from '../router'

export default {
  namespaced: true,
  state: {
    detail: null
  },
  getters: {
    detail: state => state.detail
  },
  mutations: {
    setDetail (state, detail) {
      state.detail = detail
    }
  },
  actions: {
    async create ({ rootGetters }) {
      const uid = rootGetters['auth/uid']
      const rooms = firebase.database().ref('rooms')
      const newRoom = rooms.push()
      await newRoom.set({
        owner: uid,
        members: [ uid ]
      })
      router.push({ name: 'Game', params: { roomId: newRoom.key } })
    },
    async fetchRoomDetail () {

    }
  }
}
