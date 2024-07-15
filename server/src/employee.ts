import * as mongodb from "mongodb";

export interface Employee {
	name: string;
	position: string;
	level: "junior" | "middle" | "senior";
	_id?: mongodb.ObjectId;
}