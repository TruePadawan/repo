export interface CourseItemAttributes {
	$id: string;
	name: string;
	description?: string;
	recommended_texts?: string;
	slides?: string;
    other_resources?: string;
    createdBy: string;
}