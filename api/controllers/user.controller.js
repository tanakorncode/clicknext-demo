const yup = require('yup')

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    req.assert(email, 400, `invalid email.`)
    req.assert(password, 400, `invalid password.`)

    if (email === 'demo@clicknext.com' && password === 'demo123456') {
      req.session.authUser = { username: 'demo', email }
      await req.session.save()
      return res.success({ username: 'demo', email })
    }
    res.success({ message: 'incorrect username or password.' }, 401)
  } catch (error) {
    res.error(error)
  }
}


exports.postLogout = async (req, res) => {
  try {
    req.session.authUser = null
    await req.session.save()
    // await req.session.regenerate()
    res.success()
  } catch (error) {
    res.error(error)
  }
}
