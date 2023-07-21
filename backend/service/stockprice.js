"use strict";

const yahooFinance = require("yahoo-finance");
const stocks = require("stock-ticker-symbol");
function getOneStockBySymbol(symbol, range, period) {
	const today = new Date();
	const today_formatted = today.toISOString().substring(0, 10);

	if (typeof symbol !== "string") {
		throw new TypeError("only accepts a string.");
	}

	if (!period) period = "d"; // period default

	if (!range) {
		today.setMonth(today.getMonth() - 3);
	} else {
		today.setMonth(today.getMonth() - range);
	}

	// if (range == 60) period = "w";

	const date_range = today.toISOString().substring(0, 10);
	console.log(period, "$$$");
	return yahooFinance
		.historical({
			symbol: symbol,
			from: date_range,
			to: today_formatted,
			period: period, // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
		})
		.then((data) => {
			if (data.length) {
				return checkNullValues(data);
			} else {
				return false;
			}
		});
}

function searchStockTicker(stock_name) {
	const stock_ticker = stocks.searchTicker(stock_name);
	if (stock_ticker && stock_ticker.length) {
		return stock_ticker;
	} else {
		return stocks.search("apple");
	}
}

function checkNullValues(data) {
	if (Array.isArray(data)) {
		for (let i = data.length - 1; i >= 0; i--) {
			// console.log(data);
			if (data[i].close === null) {
				data.splice(i, 1);
			} else if (data[i].date === null) {
				data.splice(i, 1);
			}
		}
		return data;
	} else {
		// ==== IF GETTING MULTIPLE ====

		for (let company in data) {
			// console.log(data[company]);
			if (data.hasOwnProperty(company)) {
				for (let i = data[company].length - 1; i >= 0; i--) {
					if (data[company][i].close === null) {
						data[company].splice(i, 1);
					} else if (data[company][i].date === null) {
						// console.log(true);
						data[company].splice(i, 1);
					}
				}
			}
		}

		// checks for undefined values.
		for (let company in data) {
			if (data.hasOwnProperty(company)) {
				if (typeof data[company][0] === "undefined") {
					delete data[company];
				}
			}
		}
		return data;
	}
}

module.exports = {
	getOneStockBySymbol,
	checkNullValues,
	searchStockTicker,
};
