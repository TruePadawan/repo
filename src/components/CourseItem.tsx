import { CourseItemAttributes } from "@/lib/types";
import {
	Button,
	Menu,
	MenuTarget,
	MenuDropdown,
	MenuItem,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";

export default function CourseItem(props: CourseItemAttributes) {
	return (
		<Button
			color="dark"
			size="xl"
			component="li"
			rightSection={
				<Menu>
					<MenuTarget>
						<IconDotsVertical />
					</MenuTarget>
					<MenuDropdown>
						<MenuItem>Edit Course Details</MenuItem>
						<MenuItem>Copy Link to Clipboard</MenuItem>
						<MenuItem>Delete Course</MenuItem>
					</MenuDropdown>
				</Menu>
			}>
			<Link href="/">{props.name}</Link>
		</Button>
	);
}
