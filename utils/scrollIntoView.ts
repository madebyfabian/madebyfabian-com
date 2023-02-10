/**
 * Usage: `<a @click="e => scrollIntoView({ e, selectors: `[id='blah']` })"> ... </a>`
 */
export const scrollIntoView = ({ e, selectors }: { e: MouseEvent; selectors: string }) => {
	// Prevent actual navigation
	e.preventDefault()

	// Get the element to scroll to
	const element = document.querySelector(selectors)

	// Scroll to the element
	element?.scrollIntoView({
		behavior: 'smooth',
	})
}
