const RayRoute = require('express').Router()
const RayhanController = require('../controllers/rayhanController.js')

RayRoute.get('/news', RayhanController.getNews)
RayRoute.get('/news/:key', RayhanController.getNews)
RayRoute.get('/statistic', RayhanController.statisticInfo)

module.exports = RayRoute