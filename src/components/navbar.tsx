import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes";
import { ModeToggle } from "./mode-toggle";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

function Navbar() {
	return (
		<nav className="w-[75%] max-w-5xl flex justify-between items-center">
			<img src={logo} alt="logo" />
			<div className="flex gap-8 items-center font-bold">
				{ROUTES.map((item) => (
					<NavLink
						to={item.path}
						className={({ isActive }) => cn(isActive ? "text-[#cc0000]" : "")}
					>
						{item.id?.toUpperCase()}
					</NavLink>
				))}
				<ModeToggle />
			</div>
		</nav>
	);
}

export default Navbar;
