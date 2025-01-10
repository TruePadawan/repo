import { deleteCourse } from "@/app/actions/courseActions";
import { CourseItemAttributes } from "@/lib/types";
import { Button, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteCourseDialogProps {
	dialogProps: {
		opened: boolean;
		close: () => void;
		open: () => void;
	};
	course: CourseItemAttributes;
}

export default function DeleteCourseDialog(props: DeleteCourseDialogProps) {
	const [btnsAreDisabled, setBtnsAreDisabled] = useState(false);
	const router = useRouter();
	const { course, dialogProps } = props;

	async function handleDelete() {
		setBtnsAreDisabled(true);
		try {
			await deleteCourse(course.$id);
			notifications.show({
				title: "Course deleted",
				message: `Course ${course.code} deleted successfully`,
			});
			router.refresh();
			dialogProps.close();
		} catch (error) {
			notifications.show({
				title: "Course not updated",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while deleting the course",
			});
		}
		setBtnsAreDisabled(false);
	}

	return (
		<Modal
			title="Delete Course"
			size="lg"
			onClose={dialogProps.close}
			opened={dialogProps.opened}
			centered>
			<p className="text-lg">{`Are you sure you want to delete ${course.code}`}</p>
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
