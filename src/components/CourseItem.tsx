"use client";
import { CourseItemAttributes } from "@/lib/types";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import EditCourseDialog from "./EditCourseDialog";
import { useDisclosure } from "@mantine/hooks";
import DeleteCourseDialog from "./DeleteCourseDialog";

export default function CourseItem(props: CourseItemAttributes) {
	const [editDialogIsOpen, { open: openEditDialog, close: closeEditDialog }] =
		useDisclosure(false);
	const [
		deleteDialogIsOpen,
		{ open: openDeleteDialog, close: closeDeleteDialog },
	] = useDisclosure(false);

	return (
		<Button
			color="dark"
			size="xl"
			component="li"
			rightSection={
				<Menu>
					<Menu.Target>
						<ActionIcon
							variant="transparent"
							aria-label="Course item menu button"
							color="gray">
							<IconDotsVertical />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={openEditDialog}>
							Edit Course Details
						</Menu.Item>
						<Menu.Item>Copy Link to Clipboard</Menu.Item>
						<Menu.Item onClick={openDeleteDialog}>
							Delete Course
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			<Link href="/">{props.code}</Link>
			<EditCourseDialog
				course={props}
				dialogProps={{
					open: openEditDialog,
					opened: editDialogIsOpen,
					close: closeEditDialog,
				}}
			/>
			<DeleteCourseDialog
				course={props}
				dialogProps={{
					open: openDeleteDialog,
					opened: deleteDialogIsOpen,
					close: closeDeleteDialog,
				}}
			/>
		</Button>
	);
}
