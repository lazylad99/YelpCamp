const mongoose = require('mongoose')
const cities = require('./cities');
const { places, descriptors, descriptions } = require('./seedHelpers');
const Campground = require('../models/campground')
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63ef25120fb199a183f0e518',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `${sample(descriptions)}`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dne1rautf/image/upload/v1677137314/YelpCamp/lix0ceji8rvl7haxajxa.jpg',
                    filename: 'YelpCamp/lix0ceji8rvl7haxajxa'
                },
                {
                    url: 'https://res.cloudinary.com/dne1rautf/image/upload/v1677137319/YelpCamp/ydvr435xjnppgnrdtry5.jpg',
                    filename: 'YelpCamp/ydvr435xjnppgnrdtry5'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});