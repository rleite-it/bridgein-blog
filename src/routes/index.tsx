import React from "react";
import { RouteProps } from "react-router-dom";

const Feed = React.lazy(() => import("@/pages/Feed"));
const Users = React.lazy(() => import("@/pages/Users"));

export const ROUTES: RouteProps[] = [
	{
		id: "feed",
		path: "/feed",
		element: <Feed />,
	},
	{
		id: "users",
		path: "/users",
		element: <Users />,
	},
];
