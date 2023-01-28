export const removeTrailingSlash = (str: string) => {
	return str !== '/' ? str.replace(/\/$/, '') : str
}
