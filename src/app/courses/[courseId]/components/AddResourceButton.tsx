"use client";
import { addResource } from "@/app/actions/courseActions";
import { ResourceAttributes } from "@/lib/types";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddResourceButtonProps {
	courseId: string;
}

export default function AddResourceButton(props: AddResourceButtonProps) {
	const [opened, { open, close }] = useDisclosure();
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			resource_title: "",
			resource_link: "",
			resource_description: "",
		},
		validate: {
			resource_title: (value) =>
				value.trim().length == 0
					? "The title of the resource is required"
					: null,
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
			const slides: Omit<ResourceAttributes, "$id"> = {
				title: values.resource_title,
				link: values.resource_link,
				description: values.resource_description,
			};
			await addResource(props.courseId, slides);
			notifications.show({
				title: "Resource added",
				message: `Resource ${slides.title} added successfully`,
			});

			form.reset();
			router.refresh();
			close();
		} catch (error) {
			notifications.show({
				title: "Resource not added",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while adding the resource",
			});
		}
		setSubmitBtnIsDisabled(false);
	}

	return (
		<>
			<Button color="gray" size="md" onClick={open}>
				Add Resource
			</Button>
			<Modal
				title="Add Resource"
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
						placeholder="Python Crash Course"
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
						Add
					</Button>
				</form>
			</Modal>
		</>
	);
}
