import { RecommendedTextsAttributes, SlidesListAttributes } from "./types";

export const DATABASE_ID = String(process.env.NEXT_PUBLIC_DATABASE_ID);
export const COLLECTION_ID = String(process.env.NEXT_PUBLIC_COLLECTION_ID);

export function parseRecommendedTexts(rawRecommendedTexts?: string) {
	if (!rawRecommendedTexts) return [];
	const recommendedTexts: RecommendedTextsAttributes =
		JSON.parse(rawRecommendedTexts);
	return Object.values(recommendedTexts);
}

export function parseSlidesList(rawSlidesList?: string) {
	if (!rawSlidesList) return [];
	const slidesList: SlidesListAttributes = JSON.parse(rawSlidesList);
	return Object.values(slidesList);
}
