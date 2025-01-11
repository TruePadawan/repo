"use client";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";

interface AuthBtnMenuTargetProps {
	userName: string;
}
export default function AuthBtnMenuTarget(props: AuthBtnMenuTargetProps) {
	const matchesScreenSize = useMediaQuery("(min-width: 640px)");
	if (matchesScreenSize) {
		return (
			<Menu.Target>
				<Button variant="light" size="md" color="gray">
					{props.userName}
				</Button>
			</Menu.Target>
		);
	} else {
		return (
			<Menu.Target>
				<ActionIcon aria-label="User" size="xl" color="dark">
					<IconUser />
				</ActionIcon>
			</Menu.Target>
		);
	}
}
