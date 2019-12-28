class Enviroment {

	static frame = () => {
		background(255);
		strokeWeight(10);
		stroke(0);
		line(0, 0, 0, y); // |
		line(0, y, x, y); // _
		line(x, y, x, 0); //  |
		line(x, 0, 0, 0); // -
	}

	static init = (current_ents) => {

		ents = new Array(current_ents);
		foods = new Array(init_num_food);
	
		for(let i = 0; i < init_num_food; i++){
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

	static nextGeneration = () => {

		let died = 0, newEnts = 0;
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
		generation++;//console.log("generación: ", ++generation, " con: ", current_ents, " entidades");
		this.init(current_ents);
		loop();
	}
}