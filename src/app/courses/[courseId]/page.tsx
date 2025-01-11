import { getCourse } from "@/app/actions/courseActions";
import { Button } from "@mantine/core";
import Link from "next/link";
import EditCourseButton from "./components/EditCourseButton";
import DeleteCourseButton from "./components/DeleteCourseButton";
import AddRecommendedTextButton from "./components/AddRecommendedTextButton";
import {
	parseRecommendedTexts,
	parseResources,
	parseSlidesList,
} from "@/lib/utils";
import RecommendedTextItem from "@/components/RecommendedTextItem/RecommendedTextItem";
import AddSlidesButton from "./components/AddSlidesButton";
import SlidesItem from "@/components/SlidesItem/SlidesItem";
import AddResourceButton from "./components/AddResourceButton";
import ResourceItem from "@/components/ResourceItem/ResourceItem";
import { getLoggedInUser } from "@/lib/server/appwrite";

interface PageProps {
	params: Promise<{ courseId: string }>;
}

export default async function Page({ params }: PageProps) {
	const user = await getLoggedInUser();
	const courseId = (await params).courseId;
	const course = await getCourse(courseId);
	const texts = parseRecommendedTexts(course.recommended_texts);
	const slidesList = parseSlidesList(course.slides);
	const resources = parseResources(course.other_resources);
	const allowManipulation = user?.$id == course.createdBy;

	return (
		<main className="flex flex-col gap-2">
			<Button color="gray" component={Link} href="/">
				Go to homepage
			</Button>
			<div className="p-8 flex flex-col gap-10">
				<div className="flex flex-col items-stretch gap-4 md:flex-row md:justify-between md:gap-0">
					<div className="flex flex-col gap-2 justify-center">
						<h2 className="text-2xl md:text-4xl font-bold">
							{course.code}
						</h2>
						{course.description && (
							<p className="text-lg md:text-xl font-semibold">
								{course.description}
							</p>
						)}
					</div>
					{allowManipulation && (
						<div className="flex flex-col gap-2">
							<EditCourseButton {...course} />
							<DeleteCourseButton {...course} />
						</div>
					)}
				</div>
				{/* RECOMMENDED TEXTS */}
				<div className="flex flex-col gap-3">
					<div className="flex flex-col items-stretch gap-4 md:flex-row md:justify-between md:gap-0">
						<h2 className="text-2xl md:text-4xl font-bold">
							Recommended Texts
						</h2>
						{allowManipulation && (
							<AddRecommendedTextButton courseId={course.$id} />
						)}
					</div>
					<ul className="flex flex-wrap gap-2">
						{texts.map((text) => (
							<RecommendedTextItem
								key={text.$id}
								text={text}
								courseId={courseId}
								allowManipulation={allowManipulation}
							/>
						))}
					</ul>
				</div>
				{/* COURSE SLIDES */}
				<div className="flex flex-col gap-3">
					<div className="flex flex-col items-stretch gap-4 md:flex-row md:justify-between md:gap-0">
						<h2 className="text-2xl md:text-4xl font-bold">
							Course Slides
						</h2>
						{allowManipulation && (
							<AddSlidesButton courseId={course.$id} />
						)}
					</div>
					<ul className="flex flex-wrap gap-2">
						{slidesList.map((slides) => (
							<SlidesItem
								key={slides.$id}
								slides={slides}
								courseId={courseId}
								allowManipulation={allowManipulation}
							/>
						))}
					</ul>
				</div>
				{/* OTHER RESOURCES */}
				<div className="flex flex-col gap-3">
					<div className="flex flex-col items-stretch gap-4 md:flex-row md:justify-between md:gap-0">
						<h2 className="text-2xl md:text-4xl font-bold">
							Other Resources
						</h2>
						{allowManipulation && (
							<AddResourceButton courseId={course.$id} />
						)}
					</div>
					<ul className="flex flex-wrap gap-2">
						{resources.map((resource) => (
							<ResourceItem
								key={resource.$id}
								resource={resource}
								courseId={courseId}
								allowManipulation={allowManipulation}
							/>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
