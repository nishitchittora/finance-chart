import React, { useCallback, useContext, useEffect, useState } from "react";
import { Autocomplete, Container, Stack, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import _debounce from "lodash.debounce";

import StockContext from "../containers/StockContext";
import { IStockRecommendations } from "../types";

function Search() {
	const {
		setStockChartData,
		timeframe,
		setLoadingChart,
		setLoadingRecommendations,
		loadingRecommendations,
	} = useContext(StockContext);

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
		if (ticker) {
			setLoadingChart(true);
			const response: AxiosResponse = await axios.post(
				"http://localhost:3002/get-stock-data",
				{
					symbol: ticker,
					period: timeframe,
				}
			);

			const data = response.data;
			let ticker_data = data.map((prices: any) => {
				return {
					date: prices.date.slice(0, 10),
					price: prices.close.toFixed(2),
				};
			});
			setLoadingChart(false);
			setStockChartData(ticker_data);
		}
	};

	useEffect(() => {
		fetchChartData(selected_stock_ticker);
	}, [timeframe]);

	useEffect(() => {}, [stock_tickers]);

	const fetchStockRecommendations = async (name: String) => {
		setLoadingRecommendations(true);
		const response: AxiosResponse = await axios.post(
			"http://localhost:3002/get-stock-tickers",
			{
				stock_name: name,
			}
		);

		const data: IStockRecommendations[] = response.data;
		setStockTickers(data);
		setLoadingRecommendations(false);
	};
	const debounceFetchRecommendations = useCallback(
		_debounce(fetchStockRecommendations, 1000),
		[]
	);

	const suggestRecommendations = (newValue: String) => {
		setStockName(newValue);
		if (newValue) debounceFetchRecommendations(newValue);
		else setStockTickers([]);
	};
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
							(ticker) =>
								newInputValue ===
								`${ticker?.name} (${ticker?.ticker})`
						);
						if (stock_ticker?.[0]) {
							fetchChartData(stock_ticker?.[0].ticker);
							setSelectedStockTicker(stock_ticker?.[0].ticker);
						}
					}}
					onInputChange={(event, newInputValue: String) => {
						if (
							newInputValue.includes("(") &&
							newInputValue.includes(")")
						) {
							const stock_ticker = stock_tickers.filter(
								(ticker) =>
									newInputValue ===
									`${ticker?.name} (${ticker?.ticker})`
							);
							if (stock_ticker?.[0])
								suggestRecommendations(
									stock_ticker?.[0].ticker
								);
						} else suggestRecommendations(newInputValue);
					}}
					id="stockName"
					freeSolo
					options={stock_tickers.map(
						(option: IStockRecommendations | null) =>
							`${option?.name} (${option?.ticker})`
					)}
					loading={loadingRecommendations}
					renderInput={(params) => (
						<TextField {...params} label="Search Stock Name" />
					)}
				/>
			</Stack>
		</Container>
	);
}

export default Search;
