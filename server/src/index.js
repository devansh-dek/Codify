const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');


const setUpAndStartServer = async (req, res) => {
    const app = new express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);





    app.listen(3000, async () => {
        console.log("start at the port");
    })


}


setUpAndStartServer();