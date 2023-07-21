import { createContext } from "react";
import { IStockContext } from "../types";

const StockContext = createContext<IStockContext>({
	stock_chart_data: [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
	],
	setStockChartData: () => {},
	stock_recommendations: [],
});

export default StockContext;
