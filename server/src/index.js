const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const cors = require('cors');


const setUpAndStartServer = async (req, res) => {
    const app = new express();
    // app.use(cors({}));

    const corsOptions = {
        origin: 'http://localhost:5173', // Change this to match your frontend origin
        credentials: true // Allow cookies and authorization headers
    };

    app.use(cors(corsOptions));


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);





    app.listen(3000, async () => {
        console.log("start at the port");
    })


}


setUpAndStartServer();