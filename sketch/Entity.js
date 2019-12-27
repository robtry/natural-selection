class Entity {

	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.d = d;
		this.eaten = 0;
	}

	step() {
		switch (Math.floor(random(4))) {
			case 0:
					this.x -= this.d;
					break;
			case 1:
					this.y += this.d;
					break;
			case 2:
					this.x += this.d;
					break;
			case 3:
					this.y -= this.d;
					break;
		}
		this.x = constrain(this.x, this.d, x - this.d); //x from main
		this.y = constrain(this.y, this.d, y - this.d); //y from main
	}

	show() {
		strokeWeight(1);
		fill('#16a085');
		stroke('#16a085');
		circle(this.x, this.y, this.d);
	}

	eat(){
		this.eaten++;
	}
}