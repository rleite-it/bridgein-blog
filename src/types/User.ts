import { PostProps } from "./Post";

type AddressProps = {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: {
		lat: string;
		lng: string;
	};
};

type CompanyProps = {
	name: string;
	catchPhrase: string;
	bs: string;
};

export type UserProps = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: AddressProps;
	phone: string;
	website: string;
	company: CompanyProps;
	posts: PostProps[];
};
