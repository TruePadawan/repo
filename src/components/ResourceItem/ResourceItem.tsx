"use client";
import { SlidesAttributes } from "@/lib/types";
import {
	Button,
	Menu,
	ActionIcon,
	Modal,
	Anchor,
	TextInput,
	Textarea,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import classes from "./ResourceItem.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
// import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface ResourceItemProps {
	courseId: string;
	resource: SlidesAttributes;
}

export default function ResourceItem(props: ResourceItemProps) {
	// const [editDialogIsOpen, { open: openEditDialog, close: closeEditDialog }] =
	// 	useDisclosure(false);
	// const [
	// 	deleteDialogIsOpen,
	// 	{ open: openDeleteDialog, close: closeDeleteDialog },
	// ] = useDisclosure(false);

	// const [
	// 	detailsDialogIsOpen,
	// 	{ open: openDetailsDialog, close: closeDetailsDialog },
	// ] = useDisclosure(false);

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
							aria-label="resource menu button"
							color="gray">
							<IconDotsVertical />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item>View Details</Menu.Item>
						<Menu.Item>Edit Resource</Menu.Item>
						<Menu.Item>Delete Resource</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			<a href={props.resource.link} target="_blank">
				{props.resource.title}
			</a>
		</Button>
	);
}

// interface EditSlidesDialogProps {
// 	dialogProps: {
// 		opened: boolean;
// 		close: () => void;
// 		open: () => void;
// 	};
// 	slides: SlidesAttributes;
// 	courseId: string;
// }

// function EditSlidesDialog(props: EditSlidesDialogProps) {
// 	const { slides, dialogProps, courseId } = props;
// 	const form = useForm({
// 		mode: "uncontrolled",
// 		initialValues: {
// 			slides_title: slides.title,
// 			slides_link: slides.link,
// 			slides_description: slides.description,
// 		},
// 		validate: {
// 			slides_title: (value) =>
// 				value.trim().length == 0 ? "Slides title is required" : null,
// 			slides_link: (value) =>
// 				value.trim().length == 0
// 					? "The link to the slides is required"
// 					: null,
// 		},
// 	});
// 	const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
// 	const router = useRouter();

// 	async function handleSubmit(values: typeof form.values) {
// 		setSubmitBtnIsDisabled(true);
// 		try {
// 			await updateSlides(
// 				{
// 					$id: slides.$id,
// 					title: values.slides_title,
// 					link: values.slides_link,
// 					description: values.slides_description,
// 				},
// 				courseId
// 			);
// 			notifications.show({
// 				title: "Slides updated",
// 				message: `Slides ${slides.title} updated successfully`,
// 			});

// 			router.refresh();
// 			dialogProps.close();
// 		} catch (error) {
// 			notifications.show({
// 				title: "Slides not updated",
// 				message:
// 					error instanceof Error
// 						? error.message
// 						: "An error occurred while updating the slides",
// 			});
// 		}
// 		setSubmitBtnIsDisabled(false);
// 	}
// 	return (
// 		<Modal
// 			title="Edit Slides"
// 			size="lg"
// 			opened={dialogProps.opened}
// 			onClose={dialogProps.close}
// 			centered>
// 			<form
// 				className="flex flex-col gap-2"
// 				onSubmit={form.onSubmit(handleSubmit)}>
// 				<TextInput
// 					size="md"
// 					radius="xs"
// 					label="Title"
// 					placeholder="Lecture1_2024"
// 					name="slides_title"
// 					key={form.key("slides_title")}
// 					{...form.getInputProps("slides_title")}
// 					required
// 				/>
// 				<TextInput
// 					type="url"
// 					size="md"
// 					radius="xs"
// 					label="Link"
// 					name="slides_link"
// 					key={form.key("slides_link")}
// 					{...form.getInputProps("slides_link")}
// 					required
// 				/>
// 				<Textarea
// 					size="md"
// 					radius="xs"
// 					label="Description"
// 					name="slides_description"
// 					key={form.key("slides_description")}
// 					{...form.getInputProps("slides_description")}
// 				/>
// 				<Button
// 					type="submit"
// 					color="gray"
// 					size="md"
// 					disabled={submitBtnIsDisabled}>
// 					Update
// 				</Button>
// 			</form>
// 		</Modal>
// 	);
// }

// interface DeleteSlidesDialogProps {
// 	dialogProps: {
// 		opened: boolean;
// 		close: () => void;
// 		open: () => void;
// 	};
// 	slides: SlidesAttributes;
// 	courseId: string;
// }

// function DeleteSlidesDialog(props: DeleteSlidesDialogProps) {
// 	const { dialogProps, slides, courseId } = props;
// 	const [btnsAreDisabled, setBtnsAreDisabled] = useState(false);
// 	const router = useRouter();

// 	async function handleDelete() {
// 		setBtnsAreDisabled(true);
// 		try {
// 			await deleteSlides(courseId, slides.$id);
// 			notifications.show({
// 				title: "Slides deleted",
// 				message: `Slides - ${slides.title} deleted successfully`,
// 			});
// 			router.refresh();
// 			dialogProps.close();
// 		} catch (error) {
// 			notifications.show({
// 				title: "Slides not deleted",
// 				message:
// 					error instanceof Error
// 						? error.message
// 						: "An error occurred while deleting the slides",
// 			});
// 		}
// 		setBtnsAreDisabled(false);
// 	}
// 	return (
// 		<Modal
// 			title="Delete Slides"
// 			size="lg"
// 			onClose={dialogProps.close}
// 			opened={dialogProps.opened}
// 			centered>
// 			<p className="text-lg">{`Are you sure you want to delete ${slides.title}`}</p>
// 			<div className="mt-2 flex flex-col gap-2">
// 				<Button
// 					color="red"
// 					size="sm"
// 					onClick={handleDelete}
// 					disabled={btnsAreDisabled}>
// 					Yes
// 				</Button>
// 				<Button
// 					color="gray"
// 					size="sm"
// 					onClick={dialogProps.close}
// 					disabled={btnsAreDisabled}>
// 					No
// 				</Button>
// 			</div>
// 		</Modal>
// 	);
// }

// interface SlidesDetailsDialogProps {
// 	dialogProps: {
// 		opened: boolean;
// 		close: () => void;
// 		open: () => void;
// 	};
// 	slides: SlidesAttributes;
// }

// function SlidesDetailsDialog(props: SlidesDetailsDialogProps) {
// 	const { dialogProps, slides } = props;
// 	return (
// 		<Modal
// 			title="Slides"
// 			size="lg"
// 			opened={dialogProps.opened}
// 			onClose={dialogProps.close}
// 			centered>
// 			<div className="flex flex-col gap-4">
// 				<div className="flex flex-col gap-1">
// 					<p className="text-md">Title</p>
// 					<p className="text-lg font-bold">{slides.title}</p>
// 				</div>
// 				<div className="flex flex-col gap-1">
// 					<p className="text-md">Link</p>
// 					<Anchor
// 						className="text-lg font-bold self-start"
// 						href={slides.link}
// 						target="_blank"
// 						underline="hover">
// 						Go to Slides
// 					</Anchor>
// 				</div>
// 				<div className="flex flex-col gap-1">
// 					<p className="text-md">Description</p>
// 					<p className="text-lg font-bold">
// 						{slides.description || "No description"}
// 					</p>
// 				</div>
// 			</div>
// 		</Modal>
// 	);
// }
