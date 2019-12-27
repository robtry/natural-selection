// setup
const x = 900; //width
const y = 800; //height
// enviroment
// *ents
const init_ents = 10; const init_tam_ent  = 25;
// *foos
const num_food = 30;  const tam_food = 10;
// *frame rates
const frame_rate = 10;
const seconds_day = 5;
// =========================================

// autocalculated
const time_limit = seconds_day * frame_rate;
let generation = 1; //describes the number of generation
let ents; //array
let foods; //array
let current_ents = init_ents;

function setup() {
	createCanvas(x,y);
	init(current_ents);
	frameRate(frame_rate);
	console.log("generación: ", generation, " con: ", init_ents, " entidades");
}

function draw() {
	frame();

	for(let i = 0; i < ents.length; i++){
		ents[i].step();
		ents[i].show();
		for(let j = 0; j < foods.length; j++){
			if(foods[j].isAvailable() && getDistance(
				ents[i].x, ents[i].y,
				foods[j].x, foods[j].y
			) <= (init_tam_ent + tam_food)){
				foods[j].take();
				ents[i].eat();
				//console.log(`ent[${i}] se comió a food[${j}]`)
			}
		}
	}
	for(let i = 0; i < foods.length; i++){
		if(foods[i].isAvailable()){
			foods[i].show();
		}
		//for(let j = 0; j < num_ents; j++){ line(foods[i].x, foods[i].y, ents[j].x, ents[j].y);}
	}

	if(frameCount % time_limit === 0){noLoop()}
}

function mouseClicked() {

	let died = 0; newEnts = 0;
	//let sumFoods = 0, leftover = 0;

	//ver quien vive y quien muere
	for(let i = 0; i < ents.length; i++){
		//sumFoods += ents[i].eaten;
		//console.log("ent[",i,"] : ", ents[i].eaten);
		if(ents[i].eaten == 0){ died++; }
		else if(ents[i].eaten >= 2){ newEnts++; }
	}
	//console.log(`Murierón: ${died}, se crearán: ${newEnts}`)

	/*ver si los números coinciden de las comidas
	console.log("total foods eaten: ", sumFoods);
	for(let i = 0; i < foods.length; i++){
		if(foods[i].isAvailable()){ leftover++; }
	}
	console.log("sobras: ", leftover)*/

	current_ents = current_ents - died + newEnts;
	console.log("generación: ", ++generation, " con: ", current_ents, " entidades");
	init(current_ents);
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

const init = (current_ents) => {

	ents = new Array(current_ents);
	foods = new Array(num_food);

	for(let i = 0; i < num_food; i++){
		foods[i] = new Food(
			Math.floor(Math.random() * x) + 1,
			Math.floor(Math.random() * y) + 1,
			tam_food
		);
	}

	for(let i = 0; i < current_ents; i++){
		ents[i] = new Entity(
			Math.floor(Math.random() * x) + 1,
			Math.floor(Math.random() * y) + 1,
			init_tam_ent
		);
	}

}


const getDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1,2));