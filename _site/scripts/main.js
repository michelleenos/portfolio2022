let space, blue, mint, turquoise, orange
let shape1
let m
let addNoise = 0
let seed = 1

function setup() {
	m = min(window.innerWidth, window.innerHeight)
	colorMode(HSL)

	space = color(248, 32, 24)
	blue = color(203, 99, 48)
	blue.setAlpha(0.2)

	// orange = color(14, 100, 55)
	// orange.setAlpha(0.3)
	// turquoise = color(171, 66, 76)
	turquoise = color(171, 66, 50)
	turquoise.setAlpha(0.5)

	let canvas = createCanvas(window.innerWidth, window.innerHeight)
	canvas.parent('#sketch')

	shape1 = new LinesCircle(m * 0.7, 0.8)
}

function draw() {
	addNoise += 0.005

	clear()
	strokeWeight(2)
	stroke(turquoise)

	let w = mouseX / width
	let h = mouseY / height

	// shape1.noiseOffset = lerp(shape1.noiseOffset, shape1.noiseOffset + addNoise, 0.01)
	shape1.noiseOffset += 0.005

	let ms = map(mouseX, 0, width, m * 0.6, m * 1.1)
	shape1.magScale = lerp(shape1.magScale, ms, 0.1)
	shape1.rotate = lerp(shape1.rotate, h * (PI / 6), 0.01)

	shape1.translateX = lerp(shape1.translateX, map(h, 0, 1, -30, 30), 0.01)
	shape1.translateY = lerp(shape1.translateY, map(w, 0, 1, -30, 30), 0.01)

	noFill()
	push()
	translate(width * 0.7, height * 0.5)
	shape1.drawShape()

	pop()
}

class LinesCircle {
	constructor(magScale, noiseOffset, rotation = 0) {
		this.magScale = magScale
		this.mag = this.magScale
		this.noiseOffset = noiseOffset
		this.a = 0
		this.rotate = rotation
		this.translateX = 0
		this.translateY = 0

		this.inc = PI / 97
	}

	drawLine(a) {
		let noiseFactor = abs(sin(a * 2)) + this.noiseOffset
		let mValue = noise(noiseFactor)
		this.mag = mValue * this.magScale

		let v = p5.Vector.fromAngle(a, this.mag)
		line(0, 0, v.x, v.y)
	}

	drawShape() {
		push()
		rotate(this.rotate)
		translate(this.translateX, this.translateY)
		let a = 0
		let i = 0
		while (a < PI * 2) {
			stroke(turquoise)
			// if (i % 3 === 0) {
			// 	stroke(orange)
			// }
			this.drawLine(a)
			a += this.inc
			i++
		}
		pop()
	}
}

function mousePressed() {
	seed++
	noiseSeed(seed)
}

function windowResized() {
	m = min(window.innerWidth, window.innerHeight)
	resizeCanvas(window.innerWidth, window.innerHeight)
}
