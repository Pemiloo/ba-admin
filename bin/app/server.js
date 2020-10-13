const express = require('express').Router;
const app = new express();

app.all('*', (req, res) => {
    const uuid = uuidv4();
    res.status(404).json({ status: 'false', message: 'Endpoint not found', ticketId: uuid });
});

module.exports = app;
