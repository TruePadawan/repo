"use server";

import { getDatabases, getLoggedInUser } from "@/lib/server/appwrite";
import { CourseItemAttributes } from "@/lib/types";
import { COLLECTION_ID, DATABASE_ID } from "@/lib/utils";
import { ID, Query } from "node-appwrite";

export async function getCourses(userId: string) {
	const databases = await getDatabases();
	const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
		Query.equal("createdBy", userId),
	]);
	const courses: CourseItemAttributes[] = response.documents.map((doc) => {
		return {
			$id: doc.$id,
			code: doc.code,
			description: doc.description,
			recommended_texts: doc.recommended_texts,
			slides: doc.slides,
			other_resources: doc.other_resources,
			createdBy: doc.createdBy,
		};
	});
	return courses;
}

export async function updateCourse(
	course: Omit<CourseItemAttributes, "createdBy">
) {
	const databases = await getDatabases();
	const response = await databases.updateDocument(
		DATABASE_ID,
		COLLECTION_ID,
		course.$id,
		course
	);

	const updatedCourse: CourseItemAttributes = {
		$id: response.$id,
		code: response.code,
		description: response.description,
		recommended_texts: response.recommended_texts,
		slides: response.slides,
		other_resources: response.other_resources,
		createdBy: response.createdBy,
	};
	return updatedCourse;
}

export async function createCourse(
	course: Omit<CourseItemAttributes, "$id" | "createdBy">
) {
	const user = await getLoggedInUser();
	if (user == null) {
		throw new Error("User not logged in");
	}
	const databases = await getDatabases();
	const response = await databases.createDocument(
		DATABASE_ID,
		COLLECTION_ID,
		ID.unique(),
		{
			...course,
			createdBy: user.$id,
		}
	);

	const newCourse: CourseItemAttributes = {
		$id: response.$id,
		code: response.code,
		description: response.description,
		recommended_texts: response.recommended_texts,
		slides: response.slides,
		other_resources: response.other_resources,
		createdBy: response.createdBy,
	};
	return newCourse;
}
