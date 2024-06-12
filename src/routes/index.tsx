import { RouteProps } from "react-router-dom";

export const ROUTES: RouteProps[] = [
	{
		id: "feed",
		path: "/feed",
		element: <h1>FEED</h1>,
	},
	{
		id: "users",
		path: "/users",
		element: <h1>USERS</h1>,
	},
];
