import {
	Box,
	Button,
	CircularProgress,
	Container,
	Link,
	Stack,
} from "@mui/material";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import React, { useContext, useEffect } from "react";
import StockContext from "../containers/StockContext";

function FinanceChart() {
	const { stock_chart_data, timeframe, setTimeFrame, loadingChart } =
		useContext(StockContext);
	console.log(stock_chart_data, "$$$$");
	if (loadingChart) {
		return (
			<Container
				sx={{
					marginTop: 20,
					alignContent: "center",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box sx={{ display: "flex" }}>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	return (
		<Container
			sx={{
				marginTop: 20,
				alignContent: "center",
				display: "flex",
				justifyContent: "center",
			}}
		>
			{stock_chart_data ? (
				<Container>
					<ResponsiveContainer width="100%" height={400}>
						<LineChart
							width={600}
							height={300}
							data={stock_chart_data}
							margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
						>
							<Line
								type="monotone"
								dataKey="price"
								stroke="#5A9D70"
							/>
							<CartesianGrid
								stroke="#ccc"
								strokeDasharray="5 5"
							/>
							<XAxis dataKey="date" />
							<YAxis
								domain={[
									"dataMin+dataMin*0.1",
									"dataMax+dataMax*0.1",
								]}
							/>
							<Tooltip />
						</LineChart>
					</ResponsiveContainer>
					<Stack direction="row" spacing={2}>
						<Button
							variant={timeframe === "d" ? "contained" : "text"}
							onClick={() => {
								timeframe !== "d" && setTimeFrame("d");
							}}
						>
							Day
						</Button>
						<Button
							variant={timeframe === "w" ? "contained" : "text"}
							onClick={() => {
								timeframe !== "w" && setTimeFrame("w");
							}}
						>
							Week
						</Button>
						<Button
							variant={timeframe === "m" ? "contained" : "text"}
							onClick={() => {
								timeframe !== "m" && setTimeFrame("m");
							}}
						>
							Month
						</Button>
					</Stack>
				</Container>
			) : (
				"Stock Name is not Present or Stock Name is invalid"
			)}
		</Container>
	);
}

export default FinanceChart;
