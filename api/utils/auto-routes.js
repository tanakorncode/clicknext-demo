'use strict'

const path = require('path')
const fs = require('fs')
// const glob = require('glob')
const router = require('express').Router()
let appRoutes = []

const autoRoutes = function (app, routesDir, routesPassed = '/', skips = []) {
  if (!fs.existsSync(routesDir)) {
    // console.error(routesDir + ' not exists')
    return
  }

  if (!fs.statSync(routesDir).isDirectory()) {
    // console.error(routesDir + ' is not a Directory')
    return
  }

  const items = fs.readdirSync(routesDir)
  items.forEach(function (data) {
    const itemPath = path.join(routesDir, data)
    if (fs.statSync(itemPath).isDirectory()) {
      if (/^.*\/$/.test(routesPassed)) {
        autoRoutes(app, itemPath, routesPassed + data)
      } else {
        autoRoutes(app, itemPath, routesPassed + '/' + data)
      }
    } else {
      const fileRouteName = data.substr(0, data.length - 3)
      if (!skips.includes(fileRouteName) && data !== '.DS_Store') {
        if (/^.*\/$/.test(routesPassed)) {
          useRouteFile(app, itemPath, routesPassed + fileRouteName)
        } else {
          useRouteFile(app, itemPath, routesPassed + '/' + fileRouteName)
        }
      }
    }
  })

  return appRoutes
}

function useRouteFile(app, file, url) {
  let uri = String(url).split('/')
  if (/^.*index$/.test(uri[uri.length - 1])) {
    uri = uri.slice(0, uri.length - 1)
    url = uri.join('/')
  }
  const route = require(file)
  route.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      const methods = Object.keys(r.route.methods).map((method) => String(method).toLocaleUpperCase())
      const path = url + r.route.path
      const filterRoute = appRoutes.filter((r) => r.path === path)
      if (!filterRoute.length) {
        appRoutes.push({ path, methods, route })
      } else {
        appRoutes = appRoutes.map((r) => {
          if (r.path === path) {
            r.methods = r.methods.concat(methods)
          }
          return r
        })
      }
    }
  })
  app.use(router.use(url, route))
}

module.exports = autoRoutes
