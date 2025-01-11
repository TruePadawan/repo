"use client";
import { SlidesAttributes } from "@/lib/types";
import { Button, Menu, ActionIcon, Modal, Anchor } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import classes from "./SlidesItem.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { deleteSlides } from "@/app/actions/courseActions";
import { useDisclosure } from "@mantine/hooks";

interface SlidesItemProps {
	courseId: string;
	slides: SlidesAttributes;
}

export default function SlidesItem(props: SlidesItemProps) {
	const [
		deleteDialogIsOpen,
		{ open: openDeleteDialog, close: closeDeleteDialog },
	] = useDisclosure(false);

	const [
		detailsDialogIsOpen,
		{ open: openDetailsDialog, close: closeDetailsDialog },
	] = useDisclosure(false);

	return (
		<Button
			component="li"
			size="md"
			radius="xs"
			color="dark"
			className="text-xl rounded-none"
			classNames={{ root: classes.root }}
			rightSection={
				<Menu>
					<Menu.Target>
						<ActionIcon
							variant="transparent"
							aria-label="slides menu button"
							color="gray">
							<IconDotsVertical />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={openDetailsDialog}>
							View Details
						</Menu.Item>
						<Menu.Item>Edit Slides</Menu.Item>
						<Menu.Item onClick={openDeleteDialog}>
							Delete Slides
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			<a href={props.slides.link} target="_blank">
				{props.slides.title}
			</a>
			<DeleteSlidesDialog
				slides={props.slides}
				courseId={props.courseId}
				dialogProps={{
					opened: deleteDialogIsOpen,
					open: openDeleteDialog,
					close: closeDeleteDialog,
				}}
			/>
			<SlidesDetailsDialog
				slides={props.slides}
				dialogProps={{
					opened: detailsDialogIsOpen,
					open: openDetailsDialog,
					close: closeDetailsDialog,
				}}
			/>
		</Button>
	);
}

interface DeleteSlidesDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	slides: SlidesAttributes;
	courseId: string;
}

function DeleteSlidesDialog(props: DeleteSlidesDialogProps) {
	const { dialogProps, slides, courseId } = props;
	const [btnsAreDisabled, setBtnsAreDisabled] = useState(false);
	const router = useRouter();

	async function handleDelete() {
		setBtnsAreDisabled(true);
		try {
			await deleteSlides(courseId, slides.$id);
			notifications.show({
				title: "Slides deleted",
				message: `Slides - ${slides.title} deleted successfully`,
			});
			router.refresh();
			dialogProps.close();
		} catch (error) {
			notifications.show({
				title: "Slides not deleted",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while deleting the slides",
			});
		}
		setBtnsAreDisabled(false);
	}
	return (
		<Modal
			title="Delete Slides"
			size="lg"
			onClose={dialogProps.close}
			opened={dialogProps.opened}
			centered>
			<p className="text-lg">{`Are you sure you want to delete ${slides.title}`}</p>
			<div className="mt-2 flex flex-col gap-2">
				<Button
					color="red"
					size="sm"
					onClick={handleDelete}
					disabled={btnsAreDisabled}>
					Yes
				</Button>
				<Button
					color="gray"
					size="sm"
					onClick={dialogProps.close}
					disabled={btnsAreDisabled}>
					No
				</Button>
			</div>
		</Modal>
	);
}

interface SlidesDetailsDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	slides: SlidesAttributes;
}

function SlidesDetailsDialog(props: SlidesDetailsDialogProps) {
	const { dialogProps, slides } = props;
	return (
		<Modal
			title="Slides"
			size="lg"
			opened={dialogProps.opened}
			onClose={dialogProps.close}
			centered>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<p className="text-md">Title</p>
					<p className="text-lg font-bold">{slides.title}</p>
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-md">Link</p>
					<Anchor
						className="text-lg font-bold self-start"
						href={slides.link}
						target="_blank"
						underline="hover">
						Go to Slides
					</Anchor>
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-md">Description</p>
					<p className="text-lg font-bold">
						{slides.description || "No description"}
					</p>
				</div>
			</div>
		</Modal>
	);
}
