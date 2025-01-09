import { getDatabases } from "@/lib/server/appwrite";
import { COLLECTION_ID, DATABASE_ID } from "@/lib/utils";
import { Query } from "node-appwrite";

export async function getCourses(userId: string) {
	const databases = await getDatabases();
	const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
		Query.equal("createdBy", userId),
	]);
	const courses = response.documents.map((doc) => {
		return {
			$id: doc.$id,
			name: doc.name,
			desciption: doc.description,
			recommended_texts: doc.recommended_texts,
			slides: doc.slides,
			other_resources: doc.other_resources,
			createdBy: doc.createdBy,
		};
	});
	return courses;
}
