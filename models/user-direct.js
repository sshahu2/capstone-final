module.exports={
  //  database:'mongodb://capstone-app:capstone-app@ds119044.mlab.com:19044/capstone-app',
     database:'mongodb://localhost:27017/capstone',
    secret:"any"

}
/*
update:
{
  _id: 1,
  name: 'John Smith',
  items: [{
     id: 1,
     name: 'item 1',
     value: 'one'
  },{
     id: 2,
     name: 'item 2',
     value: 'two'
  }]
}
Person.update({'items.id': 2}, {'$set': {
    'items.$.name': 'updated item2',
    'items.$.value': 'two updated'
}}, function(err) { ...

    app.get('/addfriend', users.addFriend);
where in my users.js file I have

exports.addFriend = function (req, res, next)
{
var friend = {"firstName": req.body.fName, "lastName": req.body.lName};
Users.findOneAndUpdate({name: req.user.name}, {$push: {friends: friend}});
};


add:
people: {
         name: String, 
         friends: [{firstName: String, lastName: String}]
        }
        pp.get('/addfriend', users.addFriend);
where in my users.js file I have

exports.addFriend = function (req, res, next)
{
var friend = {"firstName": req.body.fName, "lastName": req.body.lName};
Users.findOneAndUpdate({name: req.user.name}, {$push: {friends: friend}});
};
Assuming, var friend = { firstName: 'Harry', lastName: 'Potter' };

There are two options you have:

Update the model in-memory, and save (plain javascript array.push):

person.friends.push(friend);
person.save(done);
or

PersonModel.update(
    { _id: person._id }, 
    { $push: { friends: friend } },
    done
);

try:
var user = new mongo.Schema({
  _id : Number,
  devices:[
      {
        device_id : String,
        type : String
      }
    ]})

    Use the findOneAndUpdate() method with the 'upsert' option set to true - this creates the object if it doesn't exist (defaults to false):

var obj = req.body;
var query = {'user.username': obj.email};
var doc = {
    $set: {
        'user.username': obj.email, 
        'user.password': obj.password, 
        'user.name.first': obj.name, 
        'user.department': obj.department, 
        'user.year': obj.year, 
        'user.college': obj.college,
        'user.contact.phone': obj.contact,  
        'user.last_login': obj.last_login  
    },
    $push: { 
        'devices': {
             device_id: 'sadasd32u4je3bdjas', 
             type: 'Windows'
         }
    }
};
var options = {upsert: true};
users.findOneAndUpdate(query, doc, options, function(err){
    if(err) 
        res.json({"foo": String(err)});
    else
        res.json({"foo": "Successfully Signed up!"}); 
});
update:new
schema = mongoose.Schema({
    identifier: Number,
    shopItems: [{
         identifier: Number,
         price: Number
    }]
});
Do you have a old value for a identifier to identify its position in shopItems array ? If yes you can use positional operator to update the identifier at that position with new element. Something like find and replace in array. db.collection_name.update({"shopItems.identifier": id}, {"$set":{"shopItems.$":{identifier:myVal, price: newPrice }}}) – Veeram Sep 23 '17 at 14:23 
@Veeram yes I do have a value for the identifier, I want to find the item in the array with the correct identifier and update its prices. – MrSandman Sep 23 '17 at 14:27
Use this if you only like to update prices. db.collection_name.update({"shopItems.identifier": myVal}, {"$set":{"shopItems.$.price: newPrice }})
*/