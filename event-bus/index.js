const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const urlGenerator = (serviceName, port) => {
    return `http://${serviceName}:${port}/events`;
};

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    axios.post(urlGenerator('post-clusterip-srv', 4000), event);
    axios.post(urlGenerator('comments-srv', 4001), event);
    axios.post(urlGenerator('query-srv', 4002), event);
    axios.post(urlGenerator('moderation-srv', 4003), event);

    res.send({
        status: 'OK',
    });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on port 4005');
});
