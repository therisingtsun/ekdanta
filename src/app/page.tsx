import BottomNav from "./components/BottomNav"
import Task from "./components/Task"

export default () => {

	return <>
		<h1>Today</h1>

		<Task task={{
			title: "New Task",
			description: "Task Description",
			items: [
				{ description: "Test" }
			]
		}} />

		<BottomNav />
	</>
}