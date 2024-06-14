import { PostProps } from "@/types/Post";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import ChatBubbleIcon from "@/assets/icons/chat-bubble.tsx";

type PostItemProps = {
	numComments: number;
	openPost: (val: boolean) => void;
	postId: (id: number) => void;
} & PostProps;

function Post({
	id,
	title,
	body,
	numComments,
	openPost,
	postId,
}: PostItemProps) {
	return (
		<article>
			<Card className="text-left">
				<CardHeader className="w-full flex flex-row items-center justify-between  select-none">
					<CardTitle
						className="w-fit transition-all duration-200 hover:text-[#cc0000] cursor-pointer"
						onClick={() => {
							openPost(true);
							postId(id);
						}}
					>
						{title}
					</CardTitle>
					<div className="flex gap-2 items-center transition-all duration-200 hover:text-[#cc0000]">
						<ChatBubbleIcon width="1.2em" height="1.2em" className="" />
						<span className="font-bold">{numComments}</span>
					</div>
				</CardHeader>
				<CardContent>{body}</CardContent>
			</Card>
		</article>
	);
}

export default Post;
