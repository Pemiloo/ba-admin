const adminHandlers =  require('../modules/admin/handlers/handlers')
const express = require('express');
const app = express.Router();

app.post("/signin",async (req, res) => {
    await adminHandlers.SigninAdmin(req, res)
});
app.post("/signup",async (req, res) => {
    await adminHandlers.SignupAdmin(req, res)
});
app.post("/find",async (req, res) => {
    await adminHandlers.FindAdmin(req, res)
});
app.put("/update",async (req, res) => {
    await adminHandlers.UpdateAdmin(req, res)
});
app.delete("/:userId",async (req, res) => {
    await adminHandlers.DeleteAdmin(req, res)
});

module.exports = app;
