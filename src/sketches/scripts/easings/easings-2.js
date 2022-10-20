function easeInCubic(x) {
	return x * x * x
}

function setup() {
	createCanvas(250, 250)
	createLoop({ duration: 2 })
}

function draw() {
	clear()
	fill(255, 20, 80)
	noStroke()

	let p = animLoop.progress
	let val = abs(easeInCubic(p * 2 - 1))

	let pos = map(val, 0, 1, height * 0.2, height * 0.8)
	let r = map(val, 0, 1, height * 0.2, height * 0.4)

	translate(width / 2, pos)
	circle(0, 0, r)

	// translate(width / 2, height / 2)
	// let radius = val * (width / 2)
	// circle(0, 0, radius)
}
