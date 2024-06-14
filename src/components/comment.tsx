import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { PencilIcon } from "@/assets/icons/pencil";
import { DeleteIcon } from "@/assets/icons/delete";

function Comment({
	author,
	body,
	editComment,
	deleteComment,
}: {
	author: string;
	body: string;
	editComment: (val: string) => void;
	deleteComment: () => void;
}) {
	const [isEditting, setIsEditting] = useState<boolean>(false);
	const [input, setInput] = useState<string>(body);

	return (
		<div className="relative w-full flex flex-col border-b-[1px] pb-4">
			<span className="font-thin italic text-sm pb-2">Author: {author}</span>
			{isEditting ? (
				<Textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.code === "Enter" && input.trim().length) {
							editComment(input);
							setIsEditting(false);
						}
					}}
				/>
			) : (
				<p>{body}</p>
			)}
			<div className="absolute top-0 right-2  flex gap-4">
				{!isEditting && (
					<PencilIcon
						className="cursor-pointer transition-all duration-200 hover:text-[#cc0000]"
						onClick={() => setIsEditting(true)}
					/>
				)}
				<DeleteIcon
					className="cursor-pointer transition-all duration-200 hover:text-[#cc0000]"
					onClick={deleteComment}
				/>
			</div>
		</div>
	);
}

export default Comment;
