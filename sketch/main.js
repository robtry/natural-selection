/*
=================================================
# => Natural Selection
# => Author: Roberto Gervacio ~~ Mx ~~
# => Start Data: 23-12-19
# => Last Update: -----
# => Aditional Comments: using p5.js and Chart.js
===================================================
*/

/*
|====================================|
|=========Variables globales=========|
|====================================|
*/

// setup
const x = 900; //width
const y = 800; //heighit
// enviroment
// *ents
let init_num_ents = 10; const init_tam_ent = 25;
// *foos
let init_num_food = 15; const tam_food = 10;
// *frame rates
let frame_rate = 10;
const seconds_day = 5;

// autocalculated | moved to reset
let time_limit;
let generation; //describes the number of generation
let ents; //array
let foods; //array
let current_ents;
// *sliders & inputs
let num_ents_slider, init_num_ents_input;
let num_food_slider, init_num_food_input;
let frame_rate_slider, frame_rate_input;
let current_generation_input;
let current_ents_input;
let status_input;
let progress_input;
let food_input;
let reset_btn;
// aux
let available_food;

/*
|======================================|
|=========funciones del canvas=========|
|======================================|
*/

function setup() {
	//canvas
	createCanvas(x,y).parent('simulation');
	//controlls
	// *sliders
	num_ents_slider = createSlider(0, 50,  init_num_ents);
	num_ents_slider.parent('slider_ents');
	num_food_slider = createSlider(0, 200, init_num_food);
	num_food_slider.parent('slider_food');
	frame_rate_slider = createSlider(5, 60, frame_rate);
	frame_rate_slider.parent('frame_rate');
	// *inputs
	init_num_ents_input = document.getElementById('init_num_ents');
	init_num_food_input = document.getElementById('init_num_food');
	current_generation_input = document.getElementById('generation');
	current_ents_input = document.getElementById('current_ents');
	frame_rate_input = document.getElementById('frame_rte');
	status_input = document.getElementById('status');
	progress_input = document.getElementById('progress');
	food_input = document.getElementById('current_food');
	reset_btn = createButton('reset');
	reset_btn.parent('reset_btn');
	reset_btn.mousePressed(resetSimulation);

	//init
	resetSimulation();
}

function draw() {
	//background
	Enviroment.frame();
	//draw ents and check if can eat
	for(let i = 0; i < ents.length; i++){
		ents[i].step();
		ents[i].show();
		for(let j = 0; j < foods.length; j++){
			if(foods[j].isAvailable() && Entity.getDistance(
				ents[i].x, ents[i].y,
				foods[j].x, foods[j].y
			) <= (init_tam_ent + tam_food)){
				foods[j].take();
				available_food--;
				ents[i].eat();
				//console.log(`ent[${i}] se comió a food[${j}]`)
			}
		}
	}
	//draw food
	for(let i = 0; i < foods.length; i++){
		if(foods[i].isAvailable()){
			foods[i].show();
		}
		// draw lines
		// for(let j = 0; j < ents.length; j++){ line(foods[i].x, foods[i].y, ents[j].x, ents[j].y);}
	}

	let advance = frameCount % time_limit;
	progress_input.value = (advance * 100) / time_limit + "%";
	if(advance === 0 || current_ents == 0 ||
		(available_food === 0 && init_num_food != 0)){ noLoop(); doNextGeneration(); }

	//controlls
	init_num_ents_input.value = num_ents_slider.value();
	init_num_food_input.value = num_food_slider.value();
	frame_rate_input.value = frame_rate_slider.value();
	food_input.value = available_food;
}

function resetSimulation() {
	frameCount = 0;
	//read from slider
	frame_rate = frame_rate_slider.value();
	init_num_ents = num_ents_slider.value();
	init_num_food = num_food_slider.value();
	//autocalculate
	time_limit = seconds_day * frame_rate;
	generation = 1
	current_ents = init_num_ents;
	available_food = init_num_food;
	//values
	init_num_ents_input.value = current_ents;
	init_num_food_input.value = init_num_food;
	current_generation_input.value = generation;
	current_ents_input.value = current_ents;
	frame_rate_input.value = frame_rate;
	status_input.value = "running"
	//env
	Enviroment.init(current_ents);
	//canvas
	frameRate(frame_rate);
	// graph
	resetGraph();
	addData(generation, current_ents);
	loop();
}

/*
|======================================|
|=========funciones auxiliares=========|
|======================================|
*/

const doNextGeneration = () => {
	if(current_ents > 0) {
		frameCount = 0;
		Enviroment.nextGeneration();
		current_ents_input.value = current_ents;
		current_generation_input.value = generation;
		available_food = init_num_food;
		addData(generation, current_ents);
	} else {
		//console.log("Fin de la simulación");
		status_input.value = "stop";
	}
}
