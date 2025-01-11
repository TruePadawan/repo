"use client";
import { RecommendedTextAttributes } from "@/lib/types";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import classes from "./RecommendedTextItem.module.css";

export default function RecommendedTextItem(props: RecommendedTextAttributes) {
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
						<Menu.Item>Edit Recommended Text</Menu.Item>
						<Menu.Item>Delete Recommended Text</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			{props.title}
		</Button>
	);
}
