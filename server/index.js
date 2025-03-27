require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");

// ✅ Express app ko sabse pehle initialize karein
let app = express();

app.use(cors());
app.use(express.json());

// ✅ Pehla route
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// ✅ Routes
app.use("/api/website/enquiry", enquiryRouter);

// ✅ Dusra route (Agar same '/' path hai to ek hi hona chahiye)
app.get("/status", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
