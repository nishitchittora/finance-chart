import React, { useState } from "react";
import Search from "../components/Search";
import StockContext from "./StockContext";
import { IStockDataInterface, IStockRecommendations } from "../types";
import FinanceChart from "../components/FinanceChart";
import Login from "../components/Login";
import Navbar from "./Navbar";

function Stock() {
	const [stock_chart_data, setStockChartData] = useState<
		IStockDataInterface[] | null
	>(null);
	const [stock_recommendations, setStockRecommendations] = useState<
		IStockRecommendations[]
	>([]);
	const [loadingChart, setLoadingChart] = useState<boolean>(false);
	const [loadingRecommendations, setLoadingRecommendations] =
		useState<boolean>(false);
	const [timeframe, setTimeFrame] = useState("d");
	const data = {
		stock_chart_data,
		setStockChartData,
		stock_recommendations,
		setStockRecommendations,
		timeframe,
		setTimeFrame,
		loadingChart,
		loadingRecommendations,
		setLoadingChart,
		setLoadingRecommendations,
	};
	return (
		<StockContext.Provider value={data}>
			<Login>
				<>
					<Navbar />
					<Search />
					<FinanceChart />
				</>
			</Login>
		</StockContext.Provider>
	);
}

export default Stock;
