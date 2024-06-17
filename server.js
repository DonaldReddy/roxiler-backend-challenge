import dbConnect from "./database/dbConnect.js";
import app from "./app.js";
import seedData from "./utils/seedData.js";

dbConnect().then(async () => {
    console.log("connected to database");
    seedData().then(() => {
        app.listen(3000, () => {
            console.log('server running');
        })
    })
}).catch((error) => {
    console.log(error.message);
})