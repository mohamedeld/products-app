const path = require("path");
const express =require("express");
const app = express();
const bodyParser = require("body-parser");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
app.use(bodyParser.urlencoded({extended:false}));

app.use("/admin",adminRoute);
app.use(shopRoute);

app.use((request,response,next)=>{
    response.status(404).sendFile(path.join(__dirname,"./","views","404.html"));
});

app.use((error,request,response,next)=>{
    response.status(500).json(error)
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
})