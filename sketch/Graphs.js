/*
|=========================================|
|=========funciones para graficar=========|
|=========================================|
*/

const ctx = document.getElementById('statistics').getContext('2d');
let chart;

function addData(label, data) {
	chart.data.labels.push(label);
	chart.data.datasets.forEach((dataset) => {
			dataset.data.push(data);
	});
	chart.update();
}

function resetGraph(){
	if(chart){chart.destroy();}
	chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
				labels: [],
				datasets: [{
						label: 'Current Ents',
						//backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: []
				}]
		},

		// Configuration options go here
		options: {

		}
	});
}
