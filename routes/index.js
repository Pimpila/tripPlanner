const router = require('express').Router();
const Promise = require('bluebird')
const models = require('../models')
const Place = models.Place
const Restaurant = models.Restaurant
const Activity = models.Activity
const Hotel = models.Hotel

router.get('/', function(req,res,next){
    var findingHotels = Hotel.findAll({});
    var findingRestaurants = Restaurant.findAll({});
    var findingActivities = Activity.findAll({});
    Promise.all([findingHotels, findingRestaurants, findingActivities])
    .then(function(values){
        var hotels = values[0]
        var restaurants = values[1]
        var activities = values[2]
        res.render('index',{ hotels: hotels, restaurants: restaurants, activities: activities});
    })
})



module.exports = router;


