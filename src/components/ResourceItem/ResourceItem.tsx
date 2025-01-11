"use client";
import { ResourceAttributes } from "@/lib/types";
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
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { deleteResource, updateResource } from "@/app/actions/courseActions";

interface ResourceItemProps {
	courseId: string;
	resource: ResourceAttributes;
}

export default function ResourceItem(props: ResourceItemProps) {
	const [editDialogIsOpen, { open: openEditDialog, close: closeEditDialog }] =
		useDisclosure(false);
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
							aria-label="resource menu button"
							color="gray">
							<IconDotsVertical />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={openDetailsDialog}>
							View Details
						</Menu.Item>
						<Menu.Item onClick={openEditDialog}>
							Edit Resource
						</Menu.Item>
						<Menu.Item onClick={openDeleteDialog}>
							Delete Resource
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			<a href={props.resource.link} target="_blank">
				{props.resource.title}
			</a>
			<EditResourceDialog
				resource={props.resource}
				courseId={props.courseId}
				dialogProps={{
					opened: editDialogIsOpen,
					open: openEditDialog,
					close: closeEditDialog,
				}}
			/>
			<DeleteResourceDialog
				resource={props.resource}
				courseId={props.courseId}
				dialogProps={{
					opened: deleteDialogIsOpen,
					open: openDeleteDialog,
					close: closeDeleteDialog,
				}}
			/>
			<ResourceDetailsDialog
				resource={props.resource}
				dialogProps={{
					opened: detailsDialogIsOpen,
					open: openDetailsDialog,
					close: closeDetailsDialog,
				}}
			/>
		</Button>
	);
}

interface EditResourceDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	resource: ResourceAttributes;
	courseId: string;
}

function EditResourceDialog(props: EditResourceDialogProps) {
	const { resource, dialogProps, courseId } = props;
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			resource_title: resource.title,
			resource_link: resource.link,
			resource_description: resource.description,
		},
		validate: {
			resource_title: (value) =>
				value.trim().length == 0 ? "Resource title is required" : null,
			resource_link: (value) =>
				value.trim().length == 0
					? "The link to the resource is required"
					: null,
		},
	});
	const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
	const router = useRouter();

	async function handleSubmit(values: typeof form.values) {
		setSubmitBtnIsDisabled(true);
		try {
			await updateResource(
				{
					$id: resource.$id,
					title: values.resource_title,
					link: values.resource_link,
					description: values.resource_description,
				},
				courseId
			);
			notifications.show({
				title: "Resource updated",
				message: `Resource ${resource.title} updated successfully`,
			});

			router.refresh();
			dialogProps.close();
		} catch (error) {
			notifications.show({
				title: "Resource not updated",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while updating the resource",
			});
		}
		setSubmitBtnIsDisabled(false);
	}
	return (
		<Modal
			title="Edit Resource"
			size="lg"
			opened={dialogProps.opened}
			onClose={dialogProps.close}
			centered>
			<form
				className="flex flex-col gap-2"
				onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					size="md"
					radius="xs"
					label="Title"
					placeholder="Lecture1_2024"
					name="resource_title"
					key={form.key("resource_title")}
					{...form.getInputProps("resource_title")}
					required
				/>
				<TextInput
					type="url"
					size="md"
					radius="xs"
					label="Link"
					name="resource_link"
					key={form.key("resource_link")}
					{...form.getInputProps("resource_link")}
					required
				/>
				<Textarea
					size="md"
					radius="xs"
					label="Description"
					name="resource_description"
					key={form.key("resource_description")}
					{...form.getInputProps("resource_description")}
				/>
				<Button
					type="submit"
					color="gray"
					size="md"
					disabled={submitBtnIsDisabled}>
					Update
				</Button>
			</form>
		</Modal>
	);
}

interface DeleteResourceDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	resource: ResourceAttributes;
	courseId: string;
}

function DeleteResourceDialog(props: DeleteResourceDialogProps) {
	const { dialogProps, resource, courseId } = props;
	const [btnsAreDisabled, setBtnsAreDisabled] = useState(false);
	const router = useRouter();

	async function handleDelete() {
		setBtnsAreDisabled(true);
		try {
			await deleteResource(courseId, resource.$id);
			notifications.show({
				title: "Resource deleted",
				message: `Resource - ${resource.title} deleted successfully`,
			});
			router.refresh();
			dialogProps.close();
		} catch (error) {
			notifications.show({
				title: "Resource not deleted",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while deleting the resource",
			});
		}
		setBtnsAreDisabled(false);
	}
	return (
		<Modal
			title="Delete Resource"
			size="lg"
			onClose={dialogProps.close}
			opened={dialogProps.opened}
			centered>
			<p className="text-lg">{`Are you sure you want to delete ${resource.title}`}</p>
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

interface ResourceDetailsDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	resource: ResourceAttributes;
}

function ResourceDetailsDialog(props: ResourceDetailsDialogProps) {
	const { dialogProps, resource } = props;
	return (
		<Modal
			title="Resource"
			size="lg"
			opened={dialogProps.opened}
			onClose={dialogProps.close}
			centered>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<p className="text-md">Title</p>
					<p className="text-lg font-bold">{resource.title}</p>
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-md">Link</p>
					<Anchor
						className="text-lg font-bold self-start"
						href={resource.link}
						target="_blank"
						underline="hover">
						Go to Resource
					</Anchor>
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-md">Description</p>
					<p className="text-lg font-bold">
						{resource.description || "No description"}
					</p>
				</div>
			</div>
		</Modal>
	);
}
