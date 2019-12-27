// setup
const x = 900; //width
const y = 800; //height

// enviroment
// *ents
const init_ents = 10; let tam_ent  = 25;
// *foos
const num_food = 30; const tam_food = 10;

const frame_rate = 10;
const seconds_day = 5;

// autocalculated
const time_limit = seconds_day * frame_rate;
let generation = 1;
let ents;
let foods;

function setup() {
	createCanvas(x,y);
	init(0,0);
	frameRate(frame_rate);
	console.log("generación: ", generation, " con: ", init_ents, " entidades");
}

function draw() {
	frame()

	for(let i = 0; i < ents.length; i++){
		ents[i].step();
		ents[i].show();
		for(let j = 0; j < foods.length; j++){
			if(getDistance(
				ents[i].x, ents[i].y,
				foods[j].x, foods[j].y
			) <= (tam_ent + tam_food)){
				foods[j].taken();
				ents[i].eat();
			}
		}
	}
	for(let i = 0; i < foods.length; i++){
		if(!foods[i].isEaten()){
			foods[i].show();
		}
		/*for(let j = 0; j < num_ents; j++){
			line(foods[i].x, foods[i].y, ents[j].x, ents[j].y);
		}*/
	}

	if(frameCount % time_limit === 0){noLoop()}
}

function mouseClicked() {
	let died = 0; newEnts = 0;
	for(let i = 0; i < ents.length; i++){
		if(ents[i].eaten == 0){
			died++;
		}
		else if(ents[i].eaten <= 2){
			newEnts++;
		}
	}

	console.log("generación: ", ++generation, " con: ", init_ents - died + newEnts, " entidades");
	init(died, newEnts);
	loop();
}

const frame = () => {
	background(255);
	strokeWeight(10);
	stroke(0);
	line(0, 0, 0, y); // |
	line(0, y, x, y); // _
	line(x, y, x, 0); //  |
	line(x, 0, 0, 0); // -
}

const init = (died, news) => {
	const total_ents = init_ents - died + news;

	ents = new Array(total_ents);
	foods = new Array(num_food);

	for(let i = 0; i < num_food; i++){
		foods[i] = new Food(
			Math.floor(Math.random() * x) + 1,
			Math.floor(Math.random() * y) + 1,
			tam_food
		);
	}

	for(let i = 0; i < total_ents; i++){
		ents[i] = new Entity(
			Math.floor(Math.random() * x) + 1,
			Math.floor(Math.random() * y) + 1,
			tam_ent
		);
	}
}


const getDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1,2));