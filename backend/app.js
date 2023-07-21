const express = require("express");
const app = express();
const PORT = 3002;
const router = require("./routes/routes");
app.use(express.urlencoded());
app.use(express.json());
app.use(router);

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
