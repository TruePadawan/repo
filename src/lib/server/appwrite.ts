"use server";
import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT))
		.setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID));

	const session = (await cookies()).get("my-custom-session");

	if (!session || !session.value) {
		throw new Error("No session");
	}

	client.setSession(session.value);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT))
		.setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID))
		.setKey(String(process.env.NEXT_PUBLIC_APPWRITE_KEY));

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getDatabases() {
	const client = new Client()
		.setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT))
		.setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID))
		.setKey(String(process.env.NEXT_PUBLIC_APPWRITE_KEY));
	return new Databases(client)
}

export async function signOut() {
	const { account } = await createSessionClient();

	(await cookies()).delete("my-custom-session");
	await account.deleteSession("current");

	redirect("/");
}