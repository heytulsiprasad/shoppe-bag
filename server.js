const express = require("express");
const mongoose = require("mongoose");

const items = require("./routes/api/items");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) =>
	console.log("Connection error", error)
);

mongoose.connection.once("open", () =>
	console.log("Local database is connected...")
);

// Use Routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
