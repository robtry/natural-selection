class Food {
	constructor(x, y, d){
		this.x = x;
		this.y = y;
		this.d = d;
		this.eaten = false;

		this.x = constrain(this.x, tam_ent, x - tam_ent); //x, tam from main
		this.y = constrain(this.y, tam_ent, y - tam_ent); //y, tam from main
	}

	show() {
		strokeWeight(1);
		fill('#2ecc71');
		stroke(0);
		circle(this.x, this.y, this.d);
	}

	taken() {
		this.eaten = true;
	}

	isEaten() {
		return this.eaten;
	}

}