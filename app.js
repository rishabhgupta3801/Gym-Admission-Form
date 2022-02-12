const express = require('express');
const path = require('path');
const port = 80;
const app = express();
const fs = require("fs");

// EXPRESS SPECIFIC
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) =>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'Gym', "content": con}
    res.status(200).render('index.pug', params);
});

app.post('/', (req, res)=>{
    console.log(req.body);
    names = req.body.name;
    age = req.body.age;
    gender = req.body.gender;
    address = req.body.address;
    more = req.body.more;

    let outouttoWrite = `Name of client: ${names}, Age: ${age}, ${gender}, residence of ${address}, 
    more about them: ${more} \n \n`;
    fs.appendFileSync('output.txt', outouttoWrite, "UTF-8",{'flags': 'a+'});
    const params = {'message': 'Your form has been submitted successfully'};
    res.status(200).render('index.pug', params);
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The app successfully started on port ${port}`);
});