
const yup = require('yup')

module.exports = {
  login: {
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  }
}
