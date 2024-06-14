import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import ChatBubbleIcon from "@/assets/icons/chat-bubble.tsx";

type PostProps = {
	title: string;
	body: string;
	numComments: number;
};

function Post({ title, body, numComments }: PostProps) {
	return (
		<article>
			<Card className="text-left">
				<CardHeader className="w-full flex flex-row items-center justify-between  select-none">
					<CardTitle className="w-fit transition-all duration-200 hover:text-[#cc0000] cursor-pointer">
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
