const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "687552395d463c8a50b6da7b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo architecto commodi explicabo libero. Assumenda dolore doloremque amet sapiente. Dolore, provident quis reprehenderit ex sit impedit molestiae. Ea mollitia eligendi fuga!",
      price,
      geometry: {
        type: "Point",
        coordinates: [31.601494116772756, 29.98387236702095],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dvgcotvti/image/upload/v1753805322/YelpCamp/tcbob5yqvnhexrutoxjh.jpg",
          filename: "YelpCamp/tcbob5yqvnhexrutoxjh",
        },
        {
          url: "https://res.cloudinary.com/dvgcotvti/image/upload/v1753805321/YelpCamp/ipwzwungonfcijsxtikz.jpg",
          filename: "YelpCamp/ipwzwungonfcijsxtikz",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
