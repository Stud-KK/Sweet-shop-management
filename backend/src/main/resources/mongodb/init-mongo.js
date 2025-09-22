db = db.getSiblingDB('sweetshop');

// Create collections
db.createCollection('users');
db.createCollection('sweets');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.sweets.createIndex({ "name": 1 });

// Initial admin user
db.users.insertOne({
    username: "admin",
    email: "admin@sweetshop.com",
    password: "Y6IxucM1UU5zcfyv+2bBb/cDm0gv1uSvM3pls46MoSoJAVzXBoTzu9/UkLMYYghr",
    role: "ADMIN",
    createdAt: new Date()
});
