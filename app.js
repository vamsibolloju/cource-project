const app = require("./routes");
const port = 3000;

const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://master:master123@cluster0.i9ytxuj.mongodb.net/hackathon2?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
});

mongoose.connection
    .once("open", () => {
        console.log('Connection Established');
    })
    .on("connectionError", (err) => {
        console.log(err)
    });


app.listen(port, () => {
    console.log("app is running on " + port);
});