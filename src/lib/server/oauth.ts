"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGithub() {
	const { account } = await createAdminClient();

	const origin = (await headers()).get("origin");
	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Github,
		`${origin}/api/oauth`,
		`${origin}`
	);

	return redirect(redirectUrl);
}

export async function signUpWithGoogle() {
	const { account } = await createAdminClient();

	const origin = (await headers()).get("origin");

	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Google,
		`${origin}/api/oauth`,
		`${origin}`
	);

	return redirect(redirectUrl);
}
