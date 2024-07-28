const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const cors = require('cors');
const { Problem } = require('./models/index');

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
        // const response = await Problem.create({
        //     title: 'Sample Problem',
        //     description: 'This is a sample problem description.',
        //     sampleInput: 'Sample input',
        //     sampleOutput: 'Sample output',
        //     difficulty: 1,
        //     constraint: 'No constraints',
        //     explanation: 'Sample explanation',
        //     inputFormat: 'Sample input format',
        //     outputFormat: 'Sample output format'

        // })
        // console.log("REsponse is ", response);


    })


}


setUpAndStartServer();