import { Container, Link, Stack } from "@mui/material";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import React, { useContext } from "react";
import StockContext from "../containers/StockContext";

function FinanceChart() {
	const { stock_chart_data, timeframe, setTimeFrame } =
		useContext(StockContext);
	console.log(stock_chart_data, "$$$$");
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
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							width={500}
							height={300}
							data={stock_chart_data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="price"
								stroke="#8884d8"
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
					<Stack direction="row" spacing={2}>
						<Link
							component="button"
							variant="body2"
							onClick={() => {
								console.info("I'm a button.");
							}}
						>
							Day
						</Link>
						<Link
							component="button"
							variant="body2"
							onClick={() => {
								console.info("I'm a button.");
							}}
						>
							Week
						</Link>
						<Link
							component="button"
							variant="body2"
							onClick={() => {
								console.info("I'm a button.");
							}}
						>
							Month
						</Link>
					</Stack>
				</Container>
			) : (
				"Stock Name is not Present or Stock Name is invalid"
			)}
		</Container>
	);
}

export default FinanceChart;
