"use client";
import { updateCourse } from "@/app/actions/courseActions";
import { CourseItemAttributes } from "@/lib/types";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditCourseDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	course: CourseItemAttributes;
}

export default function EditCourseDialog(props: EditCourseDialogProps) {
	const { course, dialogProps } = props;
	const router = useRouter();
	const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
	const form = useForm({
		mode: "uncontrolled",
		initialValues: { code: course.code, description: course.description },
		validate: {
			code: (value) =>
				value.trim().length == 0 ? "Course code is required" : null,
		},
	});

	async function handleSubmit(values: typeof form.values) {
		setSubmitBtnIsDisabled(true);
		try {
			const response = await updateCourse({ ...values, $id: course.$id });
			notifications.show({
				title: "Course updated",
				message: `Course ${response.code} updated successfully`,
			});

			router.refresh();
			dialogProps.close();
		} catch (error) {
			notifications.show({
				title: "Course not updated",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while updating the course",
			});
		}
		setSubmitBtnIsDisabled(false);
	}

	return (
		<Modal
			opened={dialogProps.opened}
			onClose={dialogProps.close}
			title={`Edit course - ${course.code}`}
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
					Update
				</Button>
			</form>
		</Modal>
	);
}
