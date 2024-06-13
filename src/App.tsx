import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/routes";
import Navbar from "./components/navbar";

import "./App.css";

function App() {
	return (
		<>
			<header className="w-[100vw] h-[4rem] sticky top-0 flex justify-center items-baseline">
				<Navbar />
			</header>
			<main className="mt-5">
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
			</main>
		</>
	);
}

export default App;
