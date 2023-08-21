var express = require("express");
var router = express.Router();
var fs = require("fs");

var stockService = require("../service/StockPrice.js");

router.post("/get-stock-data", function (req, res, next) {
	const symbol = req.body.symbol;
	const range = req.body.range;
	const period = req.body.period;

	stockService.getOneStockBySymbol(symbol, range, period).then((data) => {
		if (data) {
			res.json(data);
		} else {
			res.status(404).send();
		}
	});
});

router.post("/get-stock-tickers", function (req, res, next) {
	const stock_name = req.body.stock_name;

	const data = stockService.searchStockTicker(stock_name);
	if (data) {
		res.json(data);
	} else {
		res.status(404).send();
	}
});

module.exports = router;
