import React, { useEffect } from "react";
// const yahooFinance = require("yahoo-finance");

function Search() {
	useEffect(() => {
		// yahooFinance.historical(
		// 	{
		// 		symbol: "AAPL",
		// 		from: "2012-01-01",
		// 		to: "2012-12-31",
		// 		// period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
		// 	},
		// 	function (err, quotes) {
		// 		//...
		// 		console.log(err, quotes);
		// 	}
		// );
		// // This replaces the deprecated snapshot() API
		// yahooFinance.quote(
		// 	{
		// 		symbol: "AAPL",
		// 		modules: ["price", "summaryDetail"], // see the docs for the full list
		// 	},
		// 	function (err, quotes) {
		// 		console.log(err, quotes);
		// 	}
		// );
	}, []);
	return <div></div>;
}

export default Search;
