import { getCourse } from "@/app/actions/courseActions";
import { Button } from "@mantine/core";
import Link from "next/link";
import EditCourseButton from "./EditCourseButton";
import DeleteCourseButton from "./DeleteCourseButton";
import AddRecommendedTextButton from "./AddRecommendedTextButton";
import { parseRecommendedTexts } from "@/lib/utils";
import RecommendedTextItem from "@/components/RecommendedTextItem/RecommendedTextItem";

interface PageProps {
	params: Promise<{ courseId: string }>;
}

export default async function Page({ params }: PageProps) {
	const courseId = (await params).courseId;
	const course = await getCourse(courseId);
	const texts = parseRecommendedTexts(course.recommended_texts);
	return (
		<main className="flex flex-col gap-2">
			<Button color="gray" component={Link} href="/">
				Go to homepage
			</Button>
			<div className="p-8 flex flex-col gap-10">
				<div className="flex justify-between">
					<div className="flex flex-col gap-2 justify-center">
						<h2 className="text-4xl font-bold">{course.code}</h2>
						{course.description && (
							<p className="text-xl font-semibold">
								{course.description}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<EditCourseButton {...course} />
						<DeleteCourseButton {...course} />
					</div>
				</div>
				{/* RECOMMENDED TEXTS */}
				<div className="flex flex-col gap-3">
					<div className="flex justify-between">
						<h2 className="text-4xl font-bold">
							Recommended Texts
						</h2>
						<AddRecommendedTextButton courseId={course.$id} />
					</div>
					<ul className="flex flex-wrap gap-2">
						{texts.map((text) => (
							<RecommendedTextItem key={text.$id} {...text} />
						))}
					</ul>
				</div>
				{/* COURSE SLIDES */}
				<div className="flex flex-col">
					<div className="flex justify-between">
						<h2 className="text-4xl font-bold">Course Slides </h2>
						<Button color="gray" size="md">
							Add Slide
						</Button>
					</div>
					<ul></ul>
				</div>
				{/* OTHER RESOURCES */}
				<div className="flex flex-col">
					<div className="flex justify-between">
						<h2 className="text-4xl font-bold">Other Resources</h2>
						<Button color="gray" size="md">
							Add Resource
						</Button>
					</div>
					<ul></ul>
				</div>
			</div>
		</main>
	);
}
