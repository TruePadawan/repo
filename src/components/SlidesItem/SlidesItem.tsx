"use client";
import { SlidesAttributes } from "@/lib/types";
import { Button, Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import classes from "./SlidesItem.module.css";

interface SlidesItemProps {
	courseId: string;
	slides: SlidesAttributes;
}
export default function SlidesItem(props: SlidesItemProps) {
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
							aria-label="slides menu button"
							color="gray">
							<IconDotsVertical />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item>View Details</Menu.Item>
						<Menu.Item>Edit Slides</Menu.Item>
						<Menu.Item>Delete Slides</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			}>
			<a href={props.slides.link} target="_blank">
				{props.slides.title}
			</a>
		</Button>
	);
}
