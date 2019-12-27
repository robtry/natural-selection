/*=================================================
#>= Natural Selection
#>= Author: Roberto Gervacio ~~ Mx ~~
#>= Start Data: 23-12-19
#>= Last Update: -----
#>= Aditional Comments: using p5.js and Chart.js
===================================================*/

/*
|====================================|
|=========Variables globales=========|
|====================================|
*/

// setup
const x = 900; //width
const y = 800; //height
// enviroment
// *ents
const init_num_ents = 10; const init_tam_ent  = 25;
// *foos
const init_num_food = 30; const tam_food = 10;
// *frame rates
const frame_rate = 10;
const seconds_day = 5;
// autocalculated
const time_limit = seconds_day * frame_rate;
let generation = 1; //describes the number of generation
let ents; //array
let foods; //array
let current_ents = init_num_ents;

/*
|======================================|
|=========funciones del canvas=========|
|======================================|
*/

function setup() {
	createCanvas(x,y);
	Enviroment.init(current_ents);
	frameRate(frame_rate);
	console.log("generación: ", generation, " con: ", init_num_ents, " entidades");
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

	if(frameCount % time_limit === 0){noLoop(); Enviroment.nextGeneration();}
}

function mouseClicked() {
	//Enviroment.nextGeneration();
}
