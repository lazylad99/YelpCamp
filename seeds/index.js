if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose')
const cities = require('./cities');
const { places, descriptors, descriptions } = require('./seedHelpers');
const Campground = require('../models/campground')

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.set('strictQuery', true);

mongoose.connect(dbUrl, {
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
            author: '63f85d646920987071d70e7a',
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
                    url: 'https://res.cloudinary.com/dne1rautf/image/upload/v1677999946/YelpCamp/wjokszsvhzw65d50yny5.jpg',
                    filename: 'YelpCamp/wjokszsvhzw65d50yny5'
                },
                {
                    url: 'https://res.cloudinary.com/dne1rautf/image/upload/v1677999945/YelpCamp/cam4dkrstglfm4pqv1cr.jpg',
                    filename: 'YelpCamp/cam4dkrstglfm4pqv1cr'
                },
                {
                    url: 'https://res.cloudinary.com/dne1rautf/image/upload/v1677999944/YelpCamp/y7o1jiuslleigiwntz7c.jpg',
                    filename: 'YelpCamp/y7o1jiuslleigiwntz7c'
                },
                {
                    url: 'https://res.cloudinary.com/dne1rautf/image/upload/v1677999944/YelpCamp/wygbrw3qqb3puzqcxy39.jpg',
                    filename: 'YelpCamp/wygbrw3qqb3puzqcxy39'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});