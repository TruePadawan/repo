"use client";
import { addRecommendedText } from "@/app/actions/courseActions";
import { RecommendedTextAttributes } from "@/lib/types";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddRecommendedTextButtonProps {
	courseId: string;
}

export default function AddRecommendedTextButton(
	props: AddRecommendedTextButtonProps
) {
	const [opened, { open, close }] = useDisclosure();
	const form = useForm({
		mode: "uncontrolled",
		initialValues: { text_title: "", text_author: "" },
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
			const text: Omit<RecommendedTextAttributes, "$id"> = {
				title: values.text_title,
				author: values.text_author,
			};
			await addRecommendedText(props.courseId, text);
			notifications.show({
				title: "Text added",
				message: `Text ${text.title} added successfully`,
			});

			form.reset();
			router.refresh();
			close();
		} catch (error) {
			notifications.show({
				title: "Text not added",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while adding the text",
			});
		}
	}

	return (
		<>
			<Button color="gray" size="md" onClick={open}>
				Add Recommended Text
			</Button>
			<Modal
				title="Add Recommended Text"
				size="lg"
				opened={opened}
				onClose={close}
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
						Add
					</Button>
				</form>
			</Modal>
		</>
	);
}
