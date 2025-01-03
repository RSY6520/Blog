const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());


app.post("/events", async (req, res) => {
    console.log("Event Received: ", req.body.type);
    
    const {type, data} = req.body;

    if(type === "CommentCreated") {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch(error => console.log("Error: ", error));
    }
    res.send({status: "ok"});
});


app.listen(4003, () => {
    console.log("listening on 4003");
    
})