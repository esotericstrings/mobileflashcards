const logger = (store) => (next) => (action) =>{
	console.group(action.type)
	const returnValue = next(action)
	console.groupEnd()
  console.log(returnValue)
	return returnValue
}

export default logger