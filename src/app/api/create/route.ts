import { getDatabases, getLoggedInUser } from "@/lib/server/appwrite";
import { CourseItemAttributes } from "@/lib/types";
import { DATABASE_ID, COLLECTION_ID } from "@/lib/utils";
import { NextRequest } from "next/server";
import { ID } from "node-appwrite";

type Course = Omit<CourseItemAttributes, "$id" | "createdBy">;
export async function POST(request: NextRequest) {
	const user = await getLoggedInUser();
	if (user == null) {
		return Response.json(
			{ errorMessage: "User not logged in" },
			{ status: 401 }
		);
	}

	const course: Course = await request.json();

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

	return Response.json(newCourse);
}
