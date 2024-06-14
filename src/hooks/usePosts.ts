import { useEffect, useState } from "react";
import axios from "axios";
import { PostProps } from "@/types/Post";
import { useUser } from "./useUser";
import { UserProps } from "@/types/User";
import { CommentProps } from "@/types/Comment";

export const usePosts = () => {
	const [data, setData] = useState<PostProps[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [postId, setPostId] = useState<number | null>(null);
	const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);
	const [openPost, setOpenPost] = useState<boolean>(false);
	const [user, setUser] = useState<UserProps | null>(null);
	const { loadingUser, fetchUser } = useUser();

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(
					`${
						import.meta.env.VITE_BASE_API_URL
					}/posts?_page=${page}&_embed=comments`
				);

				if (data.length === 0) {
					setHasMore(false);
				} else {
					setData((prevData) => [...prevData, ...data]);
				}
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [page]);

	useEffect(() => {
		if (openPost) {
			const fecthPostById = async () => {
				try {
					const { data } = await axios.get(
						`${
							import.meta.env.VITE_BASE_API_URL
						}/posts/${postId}?_embed=comments`
					);

					const userData = await fetchUser(data.userId);

					if (!loadingUser) {
						setUser(userData);
						setSelectedPost(data);
					}
				} catch (error) {
					console.error("Error fetching post:", error);
				}
			};

			if (!selectedPost || selectedPost.id !== postId) fecthPostById();
		}
	}, [openPost]);

	const addComment = (value: string) => {
		if (selectedPost !== null) {
			const commentLayout: CommentProps = {
				postId: selectedPost?.id,
				id: selectedPost?.comments && selectedPost?.comments?.length + 1,
				email: "user@bridgein.com",
				name: "User",
				body: value,
			};

			const updatedPost = {
				...selectedPost,
				comments: [commentLayout, ...selectedPost.comments],
			};

			const result = data.map((post) =>
				post.id === selectedPost.id ? updatedPost : post
			);

			setSelectedPost(updatedPost); // Update with a new object
			setData(result);
		}
	};

	const deleteComment = (commentId: number) => {
		if (selectedPost !== null) {
			const commentIndex = selectedPost.comments?.findIndex(
				(comment) => comment.id === commentId
			);

			const commentsArr = selectedPost.comments;
			commentsArr?.splice(commentIndex, 1);

			const updatedPost = {
				...selectedPost,
				comments: commentsArr,
			};

			const result = data.map((post) =>
				post.id === selectedPost.id ? updatedPost : post
			);

			setSelectedPost(updatedPost); // Update with a new object
			setData(result);
		}
	};

	const editComment = (commentId: number, val: string) => {
		if (selectedPost !== null) {
			const commentIndex = selectedPost.comments?.findIndex(
				(comment) => comment.id === commentId
			);
			const commentLayout: CommentProps = {
				postId: selectedPost?.id,
				id: selectedPost.comments[commentIndex].id,
				email: selectedPost.comments[commentIndex]?.email,
				name: selectedPost.comments[commentIndex]?.name,
				body: val,
			};

			const commentsArr = selectedPost.comments;
			commentsArr?.splice(commentIndex, 1, commentLayout);

			const updatedPost = {
				...selectedPost,
				comments: commentsArr,
			};

			const result = data.map((post) =>
				post.id === selectedPost.id ? updatedPost : post
			);

			setSelectedPost(updatedPost); // Update with a new object
			setData(result);
		}
	};

	return {
		data,
		loading,
		hasMore,
		setPage,
		openPost,
		setOpenPost,
		selectedPost,
		setSelectedPost,
		postId,
		setPostId,
		user,
		addComment,
		deleteComment,
		editComment,
	};
};
