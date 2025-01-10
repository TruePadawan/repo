"use client";
import EditCourseDialog from "@/components/EditCourseDialog";
import { CourseItemAttributes } from "@/lib/types";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function EditCourseButton(props: CourseItemAttributes) {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<Button color="gray" size="md" onClick={open}>
				Edit Course Details
			</Button>
			<EditCourseDialog
				dialogProps={{ opened, open, close }}
				course={props}
			/>
		</>
	);
}
