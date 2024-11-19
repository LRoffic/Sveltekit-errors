<script>
	import { onMount } from "svelte";
	import { browser } from '$app/environment';
	
	import Chart from 'chart.js/auto';

	export let name, labels, dataChart;

	let chart;

	export function updateStatChartBar(newData) {
		chart.data.datasets.forEach((dataset) => {
			dataset.data.push(newData);
		});
		
		chart.update();
	}

	onMount(async () => {
		if(browser) {
			let chartCanva = document.getElementById(name);

			chart = new Chart(
					chartCanva,
					{
						type: 'bar',
						options: {
							animation: true,
							plugins: {
								legend: {
									display: true
								},
								tooltip: {
									enabled: true
								}
							},
							responsive: true,
							maintainAspectRatio: true,
							layout: {
								padding: 20
							}
						},
						data: {
							labels: labels,
							datasets: dataChart
						}
					}
				);
		}
	});
</script>

<canvas class="w-full bg-gray-700 rounded-lg object-contain" id="{name}"></canvas>