const express = require ("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");


dotenv.config();
// This enable to send json to the body of the postman. 
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))



mongoose 
.connect(process.env.MONGO_URL, {
     useNewUrlParser: true, 
     useUnifiedTopology: true
    })
    .then(console.log("MongoDB is connected."))
    .catch((err) => console.log(err));

// This execute the upload of the new file/image.    
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded!")
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", ()=> {
    console.log("Backend server is up and running...")
});