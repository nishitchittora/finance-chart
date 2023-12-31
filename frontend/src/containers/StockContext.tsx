import { createContext } from "react";
import { IStockContext } from "../types";

const StockContext = createContext<IStockContext>({
	stock_chart_data: [],
	setStockChartData: () => {},
	stock_recommendations: [],
	timeframe: "",
	setTimeFrame: () => {},
	loadingChart: false,
	loadingRecommendations: false,
	setLoadingChart: () => {},
	setLoadingRecommendations: () => {},
});

export default StockContext;
