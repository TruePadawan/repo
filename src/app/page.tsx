import Image from "next/image";
import REPOImg from "../../public/REPO.png"

export default function Home() {
	return (
		<div className="flex-grow flex items-center gap-8 bg-[#1A1A1A] p-20 px-40">
			<div className="flex flex-col gap-2 max-w-2xl">
				<h2 className="text-4xl font-bold">Manage Course Materials</h2>
				<p className="text-3xl font-extralight">
					REPO lets you compile various resources ranging from slides,
					recommended texts, to online materials like videos and
					webpages that explain some topic relevant to a course
				</p>
			</div>
			<Image className="max-w-3xl h-max" src={REPOImg} alt="REPO features" />
		</div>
	);
}
