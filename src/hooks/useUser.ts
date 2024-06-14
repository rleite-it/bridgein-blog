import { useState } from "react";
import axios from "axios";

export const useUser = () => {
	const [loadingUser, setLoadingUser] = useState<boolean>(false);

	const fetchUser = async (id: number) => {
		setLoadingUser(true);
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_BASE_API_URL}/users/${id}`
			);

			return data;
		} catch (e) {
			console.error("Error fetching user: ", e);
		} finally {
			setLoadingUser(false);
		}
	};

	return { loadingUser, fetchUser };
};
