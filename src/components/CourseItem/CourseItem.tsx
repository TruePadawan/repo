"use client";
import { CourseItemAttributes } from "@/lib/types";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import EditCourseDialog from "./EditCourseDialog";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import DeleteCourseDialog from "./DeleteCourseDialog";
import { notifications } from "@mantine/notifications";

export default function CourseItem(props: CourseItemAttributes) {
	const [editDialogIsOpen, { open: openEditDialog, close: closeEditDialog }] =
		useDisclosure(false);
	const [
		deleteDialogIsOpen,
		{ open: openDeleteDialog, close: closeDeleteDialog },
	] = useDisclosure(false);
	const clipboard = useClipboard();

	const pathname = `/courses/${props.$id}`;

	function copyToClipboard() {
		clipboard.copy(`${window.location.href}courses/${props.$id}`);
		notifications.show({
			message: "Copied to clipboard",
		});
	}

	return (
		<Button
			color="dark"
			size="xl"
			component="li"
			className="text-lg md:text-xl"
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
						<Menu.Item onClick={copyToClipboard}>
							Copy Link to Clipboard
						</Menu.Item>
						<Menu.Item onClick={openEditDialog}>
							Edit Course Details
						</Menu.Item>
						<Menu.Item onClick={openDeleteDialog}>
							Delete Course
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			<Link href={pathname}>{props.code}</Link>
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
