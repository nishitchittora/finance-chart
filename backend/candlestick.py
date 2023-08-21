import datetime as dt
import pandas_datareader as web
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import mplfinance as mpf

start_date = dt.datetime(2019, 1, 1)
end_date = dt.datetime.now()


year = pd.read_csv('MSFT.csv', index_col=0, parse_dates=True)
year.index.name = 'Date'
mpf.plot(year, type='ohlc', volume=True, show_nontrading=True)
