import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/routes";
import Loading from "./pages/Loading";
import Navbar from "./components/navbar";

function App() {
	return (
		<>
			<header className="w-[100%] h-[4rem] bg-white dark:bg-[#0A0A0A] sticky top-0 flex justify-center items-baseline">
				<Navbar />
			</header>
			<React.Suspense fallback={<Loading />}>
				<main className="mt-10 mx-auto w-full h-full flex justify-center">
					<Routes>
						{ROUTES.map((route) => (
							<Route key={route.id} path={route.path} element={route.element} />
						))}
					</Routes>
				</main>
			</React.Suspense>
		</>
	);
}

export default App;
