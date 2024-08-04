const { createChannel, subscribeMessage } = require('../utils/MessageQueues/messageQueues');
const processSubmission = require('./processSubmissions');
console.log("WORKER IS RUNNING ");
const startWorker = async () => {
    try {
        console.log("WORKER STARTED");
        const channel = await createChannel();
        await subscribeMessage(channel, processSubmission, 'CODE_EXECUTION')
    } catch (error) {

        throw error
    }
}
startWorker();