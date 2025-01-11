"use client";
import { addSlides } from "@/app/actions/courseActions";
import { SlidesAttributes } from "@/lib/types";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddSlidesButtonProps {
	courseId: string;
}

export default function AddSlidesButton(props: AddSlidesButtonProps) {
	const [opened, { open, close }] = useDisclosure();
	const form = useForm({
		mode: "uncontrolled",
		initialValues: { slides_title: "", slides_link: "" },
		validate: {
			slides_title: (value) =>
				value.trim().length == 0 ? "Slides title is required" : null,
			slides_link: (value) =>
				value.trim().length == 0
					? "The link to the slides is required"
					: null,
		},
	});
	const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
	const router = useRouter();

	async function handleSubmit(values: typeof form.values) {
		setSubmitBtnIsDisabled(true);
		try {
			const slides: Omit<SlidesAttributes, "$id"> = {
				title: values.slides_title,
				link: values.slides_link,
			};
			await addSlides(props.courseId, slides);
			notifications.show({
				title: "Text added",
				message: `Text ${slides.title} added successfully`,
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
						: "An error occurred while adding the slides",
			});
		}
	}

	return (
		<>
			<Button color="gray" size="md" onClick={open}>
				Add Slides
			</Button>
			<Modal
				title="Add Slide"
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
						placeholder="Lecture1_2024"
						name="slides_title"
						key={form.key("slides_title")}
						{...form.getInputProps("slides_title")}
						required
					/>
					<TextInput
						type="url"
						size="md"
						radius="xs"
						label="Link"
						name="slides_link"
						key={form.key("slides_link")}
						{...form.getInputProps("slides_link")}
						required
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
