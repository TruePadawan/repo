export interface CourseItemAttributes {
	$id: string;
	code: string;
	description?: string;
	recommended_texts?: string;
	slides?: string;
	other_resources?: string;
	createdBy: string;
}

export interface RecommendedTextAttributes {
	$id: string;
	title: string;
	author?: string;
}

export interface RecommendedTextsAttributes {
	[index: string]: RecommendedTextAttributes;
}

export interface SlidesAttributes {
	$id: string;
	title: string;
	description?: string;
	link: string;
}

export interface SlidesListAttributes {
	[index: string]: SlidesAttributes;
}

export interface ResourceAttributes {
	$id: string;
	title: string;
	description?: string;
	link: string;
}

export interface ResourcesAttributes {
	[index: string]: ResourceAttributes;
}
