
let path = require("path");
let express = require("express");
let mongodb = require("mongodb");
let cors = require("cors");
let port = 8000;
let app = express();
let mongoClient = new mongodb.MongoClient("mongodb://localhost:27017/");
let db = mongoClient.db("small_ecommerce");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../assets")));

function find(collection, filter = {}) {
    let result = db.collection(collection).find(filter).toArray();
    return(result);
}

function findOne(collection, filter = {}) {
    let result = db.collection(collection).findOne(filter);
    return(result);
}

function insertOne(collection, obj) {
    findOne("counters", {ref: collection})
        .then((counter) => {
            let promiseInsert = db.collection(collection).insertOne({_id: counter.seq, ...obj});
            let promiseUpdate = db.collection("counters").updateOne(
                {_id: counter._id},
                {$set: {seq: counter.seq + 1}}
            );
            Promise.all([promiseInsert, promiseUpdate]);
        })
        .then(() => {
            console.log("[insertOne] Sucess!");
        })
        .catch((err) => {
            console.log("[insertOne] Fail: " + err);
        });
}

function updateOne(collection, filter, update) {
    let result = db.collection(collection).updateOne(filter, update);
    return(result);
}

function getCart(user, products) {
    let result = [];
    for(let i = 0; i < user.cart.length; ++i){
        let cart = user.cart[i];
        for(let j = 0; j < products.length; ++j) {
            if(cart._id === products[j]._id) {
                result.push({...products[j], quantity: cart.quantity});
                break;
            }
        }
    }
    return(result);
}

app.get("/product/:productId", (req, res) => {
    findOne("products", {_id: Number(req.params.productId)})
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.send(err);
        });
    
});

app.get("/users/:userId/cart", (req, res) => {
    let userId = Number(req.params.userId);
    Promise.all([findOne("users", {_id: userId}), find("products")])
        .then(([user, products]) => {
            res.json(getCart(user, products));
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post("/users/:userId/cart", (req, res) => {
    let userId = Number(req.params.userId);
    let productId = Number(req.body.productId);
    findOne("users", {_id: userId, "cart._id": productId})
        .then((user) => {
            console.log(user);
            if(user) {
                updateOne("users", {_id: userId, "cart._id": productId}, {$inc: {"cart.$.quantity": 1}})
            }
            else {
                let item = {_id: productId, quantity: 1};
                updateOne("users", {_id: userId}, {$push: {cart: item}});
            }
        })
        .then(() => {
            res.json();
        })
        .catch((err) => {
            res.json(err);
        });
});

app.delete("/users/:userId/cart/", (req, res) => {
    let userId = Number(req.params.userId);
    let productId = Number(req.body.productId);
    updateOne("users", {_id: userId}, {$pull: {cart: {_id: productId}}})
        .then(() => {
            return Promise.all([findOne("users", {_id: userId}), find("products")]);
        })
        .then(([user, products]) => {
            res.json(getCart(user, products));
        })
        .catch((err) => {
            res.send(err);
        });
});

app.get("/", (req, res) => {
    find("products")
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.listen(port, () => {
    console.log(`[server.js]: Listening on port http://localhost:${port}`);
});
