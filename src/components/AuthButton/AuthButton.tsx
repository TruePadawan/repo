import {
	Button,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { IconBrandGithub, IconLogout } from "@tabler/icons-react";
import { signUpWithGithub } from "@/lib/server/oauth";
import { getLoggedInUser, signOut } from "@/lib/server/appwrite";
import AuthBtnMenuTarget from "./AuthBtnMenuTarget";

export default async function AuthButton() {
	const user = await getLoggedInUser();
	return (
		<>
			{!user && (
				<Menu>
					<MenuTarget>
						<Button variant="light" color="gray" size="md">
							Sign in
						</Button>
					</MenuTarget>
					<MenuDropdown>
						<MenuItem
							leftSection={<IconBrandGithub />}
							onClick={signUpWithGithub}>
							Sign in with Github
						</MenuItem>
					</MenuDropdown>
				</Menu>
			)}
			{user && (
				<Menu>
					<AuthBtnMenuTarget userName={user.name} />
					<MenuDropdown>
						<MenuItem
							leftSection={<IconLogout />}
							onClick={signOut}>
							Logout
						</MenuItem>
					</MenuDropdown>
				</Menu>
			)}
		</>
	);
}
