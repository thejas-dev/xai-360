export const Bar = ({animationDuration,progress}) => {
	return (
		<div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-1 w-full left-0 top-0 fixed z-50" 
		style={{ marginLeft:`${(-1 + progress) * 100}%`,
			transition:`margin-left ${animationDuration}ms linear`,
		}} >

		</div>

	)
}