import axios from "axios";
import { useEffect, useState } from "react";

export const usePosts = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);

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

	return { data, loading, hasMore, setPage };
};
