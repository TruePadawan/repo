"use client";
import DeleteCourseDialog from "@/components/DeleteCourseDialog";
import { CourseItemAttributes } from "@/lib/types";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DeleteCourseButton(props: CourseItemAttributes) {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<Button color="red" size="md" onClick={open}>
				Delete Course
			</Button>
			<DeleteCourseDialog
				dialogProps={{ opened, open, close }}
				course={props}
			/>
		</>
	);
}
