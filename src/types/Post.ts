import { CommentProps } from "./Comment";

export type PostProps = {
	userId?: number;
	id: number;
	title: string;
	body: string;
	comments: CommentProps[];
};
