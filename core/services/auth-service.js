export default (axios) => ({
  /**
   *
   * @param {String} email
   * @param {String} password
   */
  login(body) {
    return axios.$post(`/login`, body)
  },

  logout() {
    return axios.$post(`/logout`)
  },
})
