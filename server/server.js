const express = require('express');
const app = express();
const http = require('http').createServer(app);



app.listen(3000,() => {
    console.log("Server is running at port 3000");
})