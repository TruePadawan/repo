"use client";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddCourse() {
	const router = useRouter();
	const [opened, { open, close }] = useDisclosure(false);
	const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
	const form = useForm({
		mode: "uncontrolled",
		initialValues: { code: "", description: "" },
		validate: {
			code: (value) =>
				value.trim().length == 0 ? "Course code is required" : null,
		},
	});

	async function handleSubmit(values: typeof form.values) {
		setSubmitBtnIsDisabled(true);
		try {
			const response = await fetch("/api/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.errorMessage);
			}

			notifications.show({
				title: "Course added",
				message: `Course ${values.code} added successfully`,
            });
            
            router.refresh();
            form.reset();
			close();
		} catch (error) {
			notifications.show({
				title: "Course not added",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while adding the course",
			});
		}
		setSubmitBtnIsDisabled(false);
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Add a course"
				size="lg"
				centered>
				<form
					className="flex flex-col gap-2"
					onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						variant="filled"
						size="md"
						radius="xs"
						label="Course code"
						placeholder="CSC102"
						name="code"
						key={form.key("code")}
						{...form.getInputProps("code")}
						required
					/>
					<Textarea
						variant="filled"
						size="md"
						radius="xs"
						label="Course description"
						name="description"
						key={form.key("description")}
						{...form.getInputProps("description")}
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
			<Button color="gray" onClick={open}>
				Add a course
			</Button>
		</>
	);
}
