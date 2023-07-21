import { SetStateAction, Dispatch } from "react";

interface IStockDataInterface {
	date: String;
	price: Number;
}

interface IStockRecommendations {
	name: String;
	ticker: String;
}

interface IStockContext {
	stock_chart_data: IStockDataInterface[] | null;
	setStockChartData: Dispatch<SetStateAction<IStockDataInterface[] | null>>;
	stock_recommendations: IStockRecommendations[];
	timeframe: string;
	setTimeFrame: Dispatch<SetStateAction<string>>;
}

export {
	type IStockContext,
	type IStockDataInterface,
	type IStockRecommendations,
};
