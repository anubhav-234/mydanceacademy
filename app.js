console.log("This is Dance Website ");

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;
//Mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/anubhav');
}
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const contact = mongoose.model('contact', contactSchema);

// STUFF FOR EXPRESS
app.use('/static', express.static('static'));
app.use(express.urlencoded());
// Serving the static files 
// STUFF FOR PUG 
app.set('view engine', 'pug'); //set template engine as pug
app.set('views', path.join(__dirname, 'views')); //set views directory



//  END POINTS 
app.get('/', (req, res) => {
    let params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    let params = {};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    let form = new contact(req.body);
    // let newData = `
    // Name    :  ${form.name} ,
    // Email   :  ${form.email} ,
    // Phone   :  ${form.phone} ,
    // Address :  ${form.address} ,
    // Descypt :  ${form.desc}
    // `;
    // fs.appendFileSync('./Data/newData.txt',newData);
    console.log(form);
    let newContact = new contact(form);
    newContact.save();
    form.save().then(() => {
        res.status(200).render('contact.pug');
    }).catch(() => {
        res.status(400).render('contact.pug');
    })
    // let params = {};
})



// Listening to the server
app.listen(port, () => {
    console.log("Application started successfullly on the port", port);
})


        
        
        




















