const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pec-eats', {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
    name: String,
    userId : String,
    email: String,
    phoneNo: Number,
    address: String,
    password: String
});

const ownerSchema = new mongoose.Schema ({
    resId: String,
    resName: String,
    password: String
});

const resturantSchema = new mongoose.Schema ({
    resId: String,
    resName: String,
    menu: [mongoose.Schema.Types.Mixed]
});

const orderSchema = new mongoose.Schema({
    orderId: String,
    items: mongoose.Schema.Types.Mixed,
    user: mongoose.Schema.Types.Mixed,
    resName: String,
    resId: String
});


const User = mongoose.model("User", userSchema);
const Owner = mongoose.model("Owner", ownerSchema);
const Resturant = mongoose.model('Resturant', resturantSchema);
const Order = mongoose.model('Order', orderSchema)

module.exports = {
    User: User,
    Owner: Owner,
    Resturant: Resturant,
    Order: Order,
}
