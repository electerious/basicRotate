import counter from 'count-between'

export const DIRECTION_X = 'x'
export const DIRECTION_Y = 'y'

const validate = function(opts = {}) {

	opts = Object.assign({}, opts)

	if (Number.isFinite(opts.index) === false) opts.index = 0
	if (Number.isFinite(opts.tolerance) === false) opts.tolerance = 10

	if (opts.draggable !== false) opts.draggable = true
	if (opts.direction !== DIRECTION_Y) opts.direction = DIRECTION_X

	if (typeof opts.beforeChange !== 'function') opts.beforeChange = () => {}
	if (typeof opts.afterChange !== 'function') opts.afterChange = () => {}

	return opts

}

const getMousePosition = function(e) {

	return {
		x: e.pageX || e.touches[0].pageX,
		y: e.pageY || e.touches[0].pageY
	}

}

const getDistance = function(a, b, direction) {

	return a[direction] - b[direction]

}

const setImage = function(images, index) {

	images.forEach((image) => image.classList.remove('active'))
	images[index].classList.add('active')

}

const init = function(elem, images, instance, opts) {

	// Set initial image using the setImage function
	// to avoid that a callback blocks the initial call.
	setImage(images, instance.current())

	// Stop here when the user disabled draggable
	if (opts.draggable === false) return

	let startIndex
	let startPosition

	const isDragging = () => (
		startIndex != null &&
		startPosition != null
	)

	const start = (e) => {

		startIndex = instance.current()
		startPosition = getMousePosition(e)

	}

	const move = (e) => {

		if (isDragging() === false) return

		const currentPosition = getMousePosition(e)
		const distance = getDistance(startPosition, currentPosition, opts.direction)
		const offset = Math.round(distance / opts.tolerance)

		instance.goto(startIndex + offset)

	}

	const end = () => {

		startIndex = undefined
		startPosition = undefined

	}

	elem.ontouchstart = start
	elem.onmousedown = start

	document.addEventListener('touchmove', move)
	document.addEventListener('mousemove', move)

	document.addEventListener('touchend', end)
	document.addEventListener('mouseup', end)

}

export const create = function(elem, opts) {

	opts = validate(opts)

	// All images inside the element
	const images = elem.querySelectorAll('img')

	// Image index counter
	let c = counter(0, images.length - 1, opts.index)

	// Returns the current image index
	const _current = () => c()

	// Navigate to a given image
	// Use c() as the default oldIndex as the counter hasn't been recreated yet,
	// when called through the API. Internal functions can set a custom oldIndex.
	const _goto = (newIndex, oldIndex = c()) => {

		// Run beforePrev event
		// Stop execution when function returns false
		if (opts.beforeChange(instance, newIndex, oldIndex) === false) return false

		// Recreate counter with new initial value
		c = counter(0, images.length - 1, newIndex)

		setImage(images, c())

		// Run afterShow event
		opts.afterChange(instance, newIndex, oldIndex)

	}

	// Navigate to the previous image
	const _prev = () => {

		// Store old index before modifying the counter
		const oldIndex = c()
		const newIndex = c(-1)

		_goto(newIndex, oldIndex)

	}

	// Navigate to the next image
	const _next = () => {

		// Store old index before modifying the counter
		const oldIndex = c()
		const newIndex = c(1)

		_goto(newIndex, oldIndex)

	}

	// Assign instance to a variable so the instance can be used
	// elsewhere in the current function.
	const instance = {
		current: _current,
		goto: _goto,
		prev: _prev,
		next: _next
	}

	// Initialize the element
	init(elem, images, instance, opts)

	return instance

}