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
	const { stock_chart_data } = useContext(StockContext);

	return (
		<Container>
			<div>
				<Container>
					{stock_chart_data ? (
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
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="pv"
									stroke="#8884d8"
									activeDot={{ r: 8 }}
								/>
								<Line
									type="monotone"
									dataKey="uv"
									stroke="#82ca9d"
								/>
							</LineChart>
						</ResponsiveContainer>
					) : (
						"Stock Name is not Present or Stock Name is invalid"
					)}
				</Container>
			</div>
			<Stack direction="row" spacing={2}>
				<Link
					component="button"
					variant="body2"
					onClick={() => {
						console.info("I'm a button.");
					}}
				>
					Button Link
				</Link>
				<Link
					component="button"
					variant="body2"
					onClick={() => {
						console.info("I'm a button.");
					}}
				>
					Button Link
				</Link>
				<Link
					component="button"
					variant="body2"
					onClick={() => {
						console.info("I'm a button.");
					}}
				>
					Button Link
				</Link>
			</Stack>
		</Container>
	);
}

export default FinanceChart;
