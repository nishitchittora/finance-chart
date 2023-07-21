import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Container, Stack, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";

import StockContext from "../containers/StockContext";
import { IStockDataInterface, IStockRecommendations } from "../types";

function Search() {
	const { setStockChartData, timeframe } = useContext(StockContext);

	const [stock_name, setStockName] = useState<
		string | String | null | undefined
	>("");
	const [selected_stock_ticker, setSelectedStockTicker] = useState<
		string | String | null | undefined
	>("");
	const [stock_tickers, setStockTickers] = useState<IStockRecommendations[]>(
		[]
	);

	const fetchChartData = async (
		ticker: string | String | null | undefined
	) => {
		console.log(stock_tickers, ticker, "$$$$");

		if (ticker) {
			const response: AxiosResponse = await axios.post(
				"http://localhost:3002/get-stock-data",
				{
					symbol: ticker,
					period: timeframe,
				}
			);

			const data = response.data;
			console.log(data, "$$");
			let ticker_data = data.map((prices: any) => {
				return {
					date: prices.date.slice(0, 10),
					price: prices.close.toFixed(2),
				};
			});
			setStockChartData(ticker_data);
		}
	};

	useEffect(() => {
		console.log("innnn", timeframe);
		fetchChartData(selected_stock_ticker);
	}, [timeframe]);

	useEffect(() => {
		const fetchStockRecommendations = async (name: String) => {
			const response: AxiosResponse = await axios.post(
				"http://localhost:3002/get-stock-tickers",
				{
					stock_name: stock_name,
				}
			);

			const data: IStockRecommendations[] = response.data;
			setStockTickers(data);
		};
		if (stock_name) fetchStockRecommendations(stock_name);
	}, [stock_name]);
	return (
		<Container>
			<Stack sx={{ marginTop: 10 }}>
				<Autocomplete
					fullWidth
					onChange={(
						event,
						newInputValue: string | String | null | undefined
					) => {
						const stock_ticker = stock_tickers.filter(
							(ticker) => newInputValue === ticker.name
						);
						if (stock_ticker?.[0]) {
							fetchChartData(newInputValue);
							setSelectedStockTicker(stock_ticker?.[0].ticker);
						}
					}}
					onInputChange={(event, newInputValue: string) => {
						setStockName(newInputValue);
					}}
					id="stockName"
					freeSolo
					options={stock_tickers.map(
						(option: IStockRecommendations | null) => option?.name
					)}
					renderInput={(params) => (
						<TextField {...params} label="Search Stock Name" />
					)}
				/>
			</Stack>
		</Container>
	);
}

export default Search;
