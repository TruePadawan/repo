import {
	Button,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
	IconBrandGithub,
	IconBrandGoogle,
	IconLogout,
} from "@tabler/icons-react";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/server/oauth";
import { getLoggedInUser, signOut } from "@/lib/server/appwrite";

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
							leftSection={<IconBrandGoogle />}
							onClick={signUpWithGoogle}>
							Sign in with Google
						</MenuItem>
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
					<MenuTarget>
						<Button variant="light" size="md" color="gray">
							{user.name}
						</Button>
					</MenuTarget>
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
