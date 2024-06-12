import { Button } from "@/components/ui/button";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/routes";

function App() {
	return (
		<>
			<Button>Click me</Button>
			<Routes>
				{ROUTES.map((route) => (
					<Route
						key={route.id}
						path={route.path}
						element={route.element}
						errorElement={route?.errorElement}
					/>
				))}
			</Routes>
		</>
	);
}

export default App;
