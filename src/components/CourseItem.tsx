"use client";
import { CourseItemAttributes } from "@/lib/types";
import { Button, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import EditCourseDialog from "./EditCourseDialog";
import { useDisclosure } from "@mantine/hooks";

export default function CourseItem(props: CourseItemAttributes) {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<Button
			color="dark"
			size="xl"
			component="li"
			rightSection={
				<Menu>
					<Menu.Target>
						<IconDotsVertical />
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={open}>
							Edit Course Details
						</Menu.Item>
						<Menu.Item>Copy Link to Clipboard</Menu.Item>
						<Menu.Item>Delete Course</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			<Link href="/">{props.code}</Link>
			<EditCourseDialog
				course={props}
				dialogProps={{ open, opened, close }}
			/>
		</Button>
	);
}
