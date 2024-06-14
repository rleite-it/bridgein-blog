import React from "react";
import { Textarea } from "./ui/textarea";
import { PencilIcon } from "@/assets/icons/pencil";
import { DeleteIcon } from "@/assets/icons/delete";

function Comment({
	author,
	body,
	edit,
}: {
	author: string;
	body: string;
	edit: boolean;
	delete: () => void;
}) {
	return (
		<div className="relative w-full flex flex-col border-b-[1px] pb-4">
			<span className="font-thin italic text-sm pb-2">Author: {author}</span>
			{edit ? <Textarea value={body} /> : <p>{body}</p>}
			<div className="absolute top-0 right-2  flex gap-4">
				<PencilIcon className="cursor-pointer transition-all duration-200 hover:text-[#cc0000]" />
				<DeleteIcon className="cursor-pointer transition-all duration-200 hover:text-[#cc0000]" />
			</div>
		</div>
	);
}

export default Comment;
