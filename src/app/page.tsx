import Image from "next/image";
import REPOImg from "../../public/REPO.png";

export default function Home() {
	return (
		<div className="flex-grow flex flex-col justify-center gap-8 bg-[#1A1A1A] p-4 xl:flex-row items-center">
			<div className="flex flex-col gap-2 max-w-2xl px-8">
				<h2 className="text-3xl font-bold">Manage Course Materials</h2>
				<p className="text-2xl font-extralight">
					REPO lets you compile various resources ranging from slides,
					recommended texts, to online materials like videos and
					webpages that explain some topic relevant to a course
				</p>
			</div>
			<Image
				className="w-auto xl:max-w-2xl 2xl:max-w-3xl h-max"
				src={REPOImg}
				alt="REPO's features"
			/>
		</div>
	);
}
