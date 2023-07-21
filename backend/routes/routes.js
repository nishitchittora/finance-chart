var express = require("express");
var router = express.Router();
var fs = require("fs");

var yahoo = require("../service/stockprice.js");

router.post("/get", function (req, res, next) {
	const symbol = req.body.symbol;
	const range = req.body.range;
	console.log(symbol, range, " $$$");

	yahoo.getOneStockBySymbol(symbol, range).then((data) => {
		if (data) {
			res.json(data);
		} else {
			res.status(404).send();
		}
	});
});

module.exports = router;
