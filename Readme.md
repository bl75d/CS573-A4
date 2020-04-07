# Assignment4 README
gh page:
[https://bl75d.github.io/CS573-A4/](https://bl75d.github.io/CS573-A4/)

	
![Screen Shot 2020-04-06 at 11 23 20 PM](https://user-images.githubusercontent.com/21250458/78627916-a9d93780-7860-11ea-9b7e-646c4f883b0b.png)

Description:
There are three views generated from the Covid-19 dataset, the dataset is cleaned through data.world and denoted by state of USA. The first view represent a time series data of number of infected states during the time period, the second chart represent the total case binned by state and the third chart is the deaths binned by state. When select the time period on the first chart, the second and the third one will update.

Technical and design:
For coordinated multiple views, this project applied crossfilter, onmouse and onbrush in D3 to get the view updated when making a selection on the first chart; also, the first chart is a time series chart, the dataset is trimmed and reformatted to fit the requirement of the time series chart.
