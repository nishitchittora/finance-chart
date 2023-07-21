import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Container, Stack, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";

import StockContext from "../containers/StockContext";
import { IStockDataInterface, IStockRecommendations } from "../types";

function Search() {
	const { setStockChartData } = useContext(StockContext);

	const [stock_name, setStockName] = useState<
		string | String | null | undefined
	>("");
	const [stock_tickers, setStockTickers] = useState<IStockRecommendations[]>(
		[]
	);

	const fetchChartData = async (name: string | String | null | undefined) => {
		const stock_ticker = stock_tickers.filter(
			(ticker) => stock_name === ticker.name
		);
		if (stock_ticker?.[0]) {
			const response: AxiosResponse = await axios.post(
				"http://localhost:3002/get-stock-data",
				{
					symbol: stock_ticker?.[0].ticker,
				}
			);

			const data: IStockDataInterface[] = response.data;
			console.log(data, "$$");
			setStockChartData(data);
		}
	};

	useEffect(() => {
		const fetchStockRecommendations = async (name: String) => {
			const response: AxiosResponse = await axios.post(
				"http://localhost:3002/get-stock-tickers",
				{
					stock_name: stock_name,
				}
			);

			const data: IStockRecommendations[] = response.data;
			console.log(data, "$$");
			setStockTickers(data);
		};
		if (stock_name) fetchStockRecommendations(stock_name);
	}, [stock_name]);
	console.log(stock_tickers, "@@@@");
	return (
		<Container>
			<Stack sx={{ marginTop: 10 }}>
				<Autocomplete
					fullWidth
					onChange={(
						event,
						newInputValue: string | String | null | undefined
					) => {
						console.log(newInputValue, " @@4");
						fetchChartData(newInputValue);
						setStockTickers([]);
					}}
					onInputChange={(event, newInputValue: string) => {
						console.log(newInputValue, " @@2");
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
