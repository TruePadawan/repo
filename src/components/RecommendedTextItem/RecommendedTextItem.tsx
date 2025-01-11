"use client";
import { RecommendedTextAttributes } from "@/lib/types";
import { ActionIcon, Button, Menu, Modal, TextInput } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import classes from "./RecommendedTextItem.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import {
	deleteRecommendedText,
	updateRecommendedText,
} from "@/app/actions/courseActions";

interface RecommendedTextItemProps {
	text: RecommendedTextAttributes;
	courseId: string;
}
export default function RecommendedTextItem(props: RecommendedTextItemProps) {
	const [editDialogIsOpen, { open: openEditDialog, close: closeEditDialog }] =
		useDisclosure(false);
	const [
		deleteDialogIsOpen,
		{ open: openDeleteDialog, close: closeDeleteDialog },
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
							aria-label="Recommended text menu button"
							color="gray">
							<IconDotsVertical />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={openEditDialog}>
							Edit Recommended Text
						</Menu.Item>
						<Menu.Item onClick={openDeleteDialog}>
							Delete Recommended Text
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			{props.text.title}
			<EditRecommendedTextDialog
				text={props.text}
				courseId={props.courseId}
				dialogProps={{
					opened: editDialogIsOpen,
					open: openEditDialog,
					close: closeEditDialog,
				}}
			/>
			<DeleteRecommendedTextDialog
				dialogProps={{
					opened: deleteDialogIsOpen,
					open: openDeleteDialog,
					close: closeDeleteDialog,
				}}
				text={props.text}
				courseId={props.courseId}
			/>
		</Button>
	);
}

interface EditRecommendedTextDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	text: RecommendedTextAttributes;
	courseId: string;
}

function EditRecommendedTextDialog(props: EditRecommendedTextDialogProps) {
	const { text, dialogProps, courseId } = props;
	const form = useForm({
		mode: "uncontrolled",
		initialValues: { text_title: text.title, text_author: text.author },
		validate: {
			text_title: (value) =>
				value.trim().length == 0 ? "Text title is required" : null,
		},
	});
	const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
	const router = useRouter();

	async function handleSubmit(values: typeof form.values) {
		setSubmitBtnIsDisabled(true);
		try {
			await updateRecommendedText(
				{
					$id: text.$id,
					title: values.text_title,
					author: values.text_author,
				},
				courseId
			);
			notifications.show({
				title: "Course updated",
				message: `Course ${text.title} updated successfully`,
			});

			router.refresh();
			dialogProps.close();
		} catch (error) {
			notifications.show({
				title: "Text not updated",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while updating the text",
			});
		}
		setSubmitBtnIsDisabled(false);
	}
	return (
		<Modal
			title="Edit Recommended Text"
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
					placeholder="Python for Dummies"
					name="text_title"
					key={form.key("text_title")}
					{...form.getInputProps("text_title")}
					required
				/>
				<TextInput
					size="md"
					radius="xs"
					label="Author"
					placeholder="Aahz Maruch and Stef Maruch"
					name="text_author"
					key={form.key("text_author")}
					{...form.getInputProps("text_author")}
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

interface DeleteRecommendedTextDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	text: RecommendedTextAttributes;
	courseId: string;
}
function DeleteRecommendedTextDialog(props: DeleteRecommendedTextDialogProps) {
	const { dialogProps, text, courseId } = props;
	const [btnsAreDisabled, setBtnsAreDisabled] = useState(false);
	const router = useRouter();

	async function handleDelete() {
		setBtnsAreDisabled(true);
		try {
			await deleteRecommendedText(courseId, text.$id);
			notifications.show({
				title: "Text deleted",
				message: `Text - ${text.title} deleted successfully`,
			});
			router.refresh();
			dialogProps.close();
		} catch (error) {
			notifications.show({
				title: "Course not updated",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while deleting the text",
			});
		}
		setBtnsAreDisabled(false);
	}
	return (
		<Modal
			title="Delete Text"
			size="lg"
			onClose={dialogProps.close}
			opened={dialogProps.opened}
			centered>
			<p className="text-lg">{`Are you sure you want to delete ${text.title}`}</p>
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
