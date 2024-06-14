import { useCallback, useEffect } from "react";
import Post from "@/components/post";
import { usePosts } from "@/hooks/usePosts";
import { LoadingIcon } from "@/assets/icons/loading";

function Feed() {
	const { data, loading, hasMore, setPage } = usePosts();

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
						title={post.title}
						body={post.body}
						numComments={post.comments.length}
					/>
				))}

				{loading && (
					<div className="w-full flex justify-center items-center">
						<LoadingIcon width="3rem" height="3rem" />
					</div>
				)}
			</div>
		</div>
	);
}

export default Feed;
