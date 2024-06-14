import { useCallback, useEffect, useState } from "react";
import Post from "@/components/post";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Comment from "@/components/comment";
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";

import { LoadingIcon } from "@/assets/icons/loading";

function Feed() {
	const {
		data,
		loading,
		hasMore,
		setPage,
		openPost,
		setOpenPost,
		selectedPost,
		setPostId,
		user,
		addComment,
		deleteComment,
	} = usePosts();
	const { loadingUser } = useUser();
	const [inputValue, setInputValue] = useState<string | null>(null);

	const handleScroll = useCallback(() => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			if (hasMore) {
				setPage((prevPage) => prevPage + 1);
			}
		}
	}, [hasMore, setPage]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<div className="max-w-5xl">
			<div className="flex flex-col gap-5 mb-8">
				{data.map((post) => (
					<Post
						key={`post-${post.id}`}
						id={post.id}
						title={post.title}
						body={post.body}
						numComments={post.comments ? post.comments.length : 0}
						openPost={setOpenPost}
						postId={setPostId}
					/>
				))}

				{loading && (
					<div className="w-full flex justify-center items-center">
						<LoadingIcon width="3rem" height="3rem" />
					</div>
				)}
			</div>
			<Dialog open={openPost} onOpenChange={setOpenPost}>
				<DialogContent
					className="max-w-[800px] min-w-[700px]"
					onInteractOutside={(e) => e.preventDefault()}
				>
					{selectedPost !== null && !loadingUser ? (
						<>
							<DialogHeader>
								<DialogTitle>{selectedPost.title}</DialogTitle>
							</DialogHeader>
							<div className="flex flex-col gap-4 pt-4 border-t-2">
								<div className="flex gap-4 w-full justify-between min-h-fit">
									<p className="max-w-[70%]">{selectedPost.body}</p>
									<hr className="w-0 min-h-[100%] border-[1px]" />
									<div className="min-w-fit flex flex-col flex-1">
										<p className="font-bold">
											Author:{" "}
											<span className="font-normal">{user?.name ?? ""}</span>
										</p>
										<p className="font-bold">
											Email:{" "}
											<span className="font-normal">{user?.email ?? ""}</span>
										</p>
										<p className="font-bold">
											Website:{" "}
											<a
												href={`https://${user?.website}`}
												target="_blank"
												rel="noopener noreferrer"
												className="font-normal"
											>
												{user?.website ?? ""}
											</a>
										</p>
									</div>
								</div>
								<div className="pt-8 flex flex-col gap-6">
									<Textarea
										placeholder="Write a comment..."
										value={inputValue ?? ""}
										onChange={(e) => setInputValue(e.target.value)}
										onKeyDown={(e) => {
											if (e.code === "Enter" && inputValue) {
												if (inputValue.trim().length) addComment(inputValue);
												setInputValue("");
											}
										}}
										onKeyUp={(e) => {
											if (e.code === "Enter") setInputValue("");
										}}
									/>
									<div className="max-h-[500px] overflow-auto w-full border-[1px] p-4 rounded-md flex flex-col gap-4">
										{selectedPost.comments?.length ? (
											selectedPost.comments.map((comment) => (
												<Comment
													key={`comment-${comment.id}`}
													author={comment.email}
													body={comment.body}
													editComment={() => console.log("editou")}
													deleteComment={() => deleteComment(comment.id)}
													isAuthor={comment.email === user?.email}
												/>
											))
										) : (
											<span className="font-thin italic text-center">
												Não tem comentários!
											</span>
										)}
									</div>
								</div>
							</div>
						</>
					) : (
						<div className="w-full flex justify-center items-center">
							<LoadingIcon width="3rem" height="3rem" />
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default Feed;
