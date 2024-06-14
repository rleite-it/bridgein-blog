import React from "react";
import { RouteProps, Navigate } from "react-router-dom";

const Feed = React.lazy(() => import("@/pages/Feed"));

export const ROUTES: RouteProps[] = [
	{
		id: "feed",
		path: "/feed",
		element: <Feed />,
	},
	{
		id: "index",
		path: "/",
		element: <Navigate to="/feed" replace />,
	},
];
