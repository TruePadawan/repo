"use server";

import { getDatabases, getLoggedInUser } from "@/lib/server/appwrite";
import {
	CourseItemAttributes,
	RecommendedTextAttributes,
	RecommendedTextsAttributes,
	ResourceAttributes,
	ResourcesAttributes,
	SlidesAttributes,
	SlidesListAttributes,
} from "@/lib/types";
import { COLLECTION_ID, DATABASE_ID } from "@/lib/utils";
import { ID, Permission, Query, Role } from "node-appwrite";

// ------------------ COURSES ----------------
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

export async function getCourse(courseId: string) {
	const databases = await getDatabases();
	const response = await databases.getDocument(
		DATABASE_ID,
		COLLECTION_ID,
		courseId
	);

	const course: CourseItemAttributes = {
		$id: response.$id,
		code: response.code,
		description: response.description,
		recommended_texts: response.recommended_texts,
		slides: response.slides,
		other_resources: response.other_resources,
		createdBy: response.createdBy,
	};
	return course;
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
		},
		[
			Permission.update(Role.user(user.$id)),
			Permission.delete(Role.user(user.$id)),
		]
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

export async function deleteCourse(courseId: string) {
	const databases = await getDatabases();
	await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, courseId);
}

// ------------------ RECOMMENDED TEXTS ----------------
export async function addRecommendedText(
	courseId: string,
	text: Omit<RecommendedTextAttributes, "$id">
) {
	const course = await getCourse(courseId);
	const recommended_texts = course.recommended_texts
		? JSON.parse(course.recommended_texts)
		: {};
	const id = ID.unique();
	const newRecommendedTexts: RecommendedTextsAttributes = {
		...recommended_texts,
		[id]: { ...text, $id: id },
	};
	await updateCourse({
		...course,
		recommended_texts: JSON.stringify(newRecommendedTexts),
	});
}

export async function updateRecommendedText(
	text: RecommendedTextAttributes,
	courseId: string
) {
	const databases = await getDatabases();
	const response = await databases.getDocument(
		DATABASE_ID,
		COLLECTION_ID,
		courseId,
		[Query.select(["recommended_texts"])]
	);
	const course: Pick<CourseItemAttributes, "recommended_texts"> = {
		recommended_texts: response.recommended_texts,
	};
	const recommended_texts = course.recommended_texts
		? JSON.parse(course.recommended_texts)
		: {};
	recommended_texts[text.$id] = text;

	await databases.updateDocument(DATABASE_ID, COLLECTION_ID, courseId, {
		recommended_texts: JSON.stringify(recommended_texts),
	});
}

export async function deleteRecommendedText(courseId: string, textId: string) {
	const databases = await getDatabases();
	const response = await databases.getDocument(
		DATABASE_ID,
		COLLECTION_ID,
		courseId,
		[Query.select(["recommended_texts"])]
	);
	const course: Pick<CourseItemAttributes, "recommended_texts"> = {
		recommended_texts: response.recommended_texts,
	};
	const recommended_texts = course.recommended_texts
		? JSON.parse(course.recommended_texts)
		: {};
	delete recommended_texts[textId];
	await databases.updateDocument(DATABASE_ID, COLLECTION_ID, courseId, {
		recommended_texts: JSON.stringify(recommended_texts),
	});
}

// ------------------ SLIDES ----------------
export async function addSlides(
	courseId: string,
	slides: Omit<SlidesAttributes, "$id">
) {
	const course = await getCourse(courseId);
	const slidesList = course.slides ? JSON.parse(course.slides) : {};
	const id = ID.unique();
	const newSlidesList: SlidesListAttributes = {
		...slidesList,
		[id]: { ...slides, $id: id },
	};
	await updateCourse({
		...course,
		slides: JSON.stringify(newSlidesList),
	});
}

export async function updateSlides(slides: SlidesAttributes, courseId: string) {
	const databases = await getDatabases();
	const response = await databases.getDocument(
		DATABASE_ID,
		COLLECTION_ID,
		courseId,
		[Query.select(["slides"])]
	);
	const course: Pick<CourseItemAttributes, "slides"> = {
		slides: response.slides,
	};
	const updatedSlides = course.slides ? JSON.parse(course.slides) : {};
	updatedSlides[slides.$id] = slides;

	await databases.updateDocument(DATABASE_ID, COLLECTION_ID, courseId, {
		slides: JSON.stringify(updatedSlides),
	});
}

export async function deleteSlides(courseId: string, slidesId: string) {
	const databases = await getDatabases();
	const response = await databases.getDocument(
		DATABASE_ID,
		COLLECTION_ID,
		courseId,
		[Query.select(["slides"])]
	);
	const course: Pick<CourseItemAttributes, "slides"> = {
		slides: response.slides,
	};
	const slides = course.slides ? JSON.parse(course.slides) : {};
	delete slides[slidesId];
	await databases.updateDocument(DATABASE_ID, COLLECTION_ID, courseId, {
		slides: JSON.stringify(slides),
	});
}

// ------------------ RESOURCES ----------------
export async function addResource(
	courseId: string,
	resource: Omit<ResourceAttributes, "$id">
) {
	const course = await getCourse(courseId);
	const resources: ResourcesAttributes = course.other_resources
		? JSON.parse(course.other_resources)
		: {};
	const id = ID.unique();
	const updatedResources = {
		...resources,
		[id]: { ...resource, $id: id },
	};
	await updateCourse({
		...course,
		other_resources: JSON.stringify(updatedResources),
	});
}

export async function updateResource(
	resource: ResourceAttributes,
	courseId: string
) {
	const databases = await getDatabases();
	const response = await databases.getDocument(
		DATABASE_ID,
		COLLECTION_ID,
		courseId,
		[Query.select(["other_resources"])]
	);
	const course: Pick<CourseItemAttributes, "other_resources"> = {
		other_resources: response.other_resources,
	};
	const updatedResources = course.other_resources
		? JSON.parse(course.other_resources)
		: {};
	updatedResources[resource.$id] = resource;

	await databases.updateDocument(DATABASE_ID, COLLECTION_ID, courseId, {
		other_resources: JSON.stringify(updatedResources),
	});
}

export async function deleteResource(courseId: string, resourceId: string) {
	const databases = await getDatabases();
	const response = await databases.getDocument(
		DATABASE_ID,
		COLLECTION_ID,
		courseId,
		[Query.select(["other_resources"])]
	);
	const course: Pick<CourseItemAttributes, "other_resources"> = {
		other_resources: response.other_resources,
	};
	const resources = course.other_resources
		? JSON.parse(course.other_resources)
		: {};
	delete resources[resourceId];
	await databases.updateDocument(DATABASE_ID, COLLECTION_ID, courseId, {
		other_resources: JSON.stringify(resources),
	});
}
