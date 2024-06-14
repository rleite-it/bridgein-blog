import React from "react";
import { LoadingIcon } from "@/assets/icons/loading";

function Loading() {
	return (
		<div className="w-full h-full flex flex-1 justify-center items-center">
			<LoadingIcon width="6rem" height="6rem" />
		</div>
	);
}

export default Loading;
