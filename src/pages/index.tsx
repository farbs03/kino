import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
	// const user = api.user.findUser.useQuery({
	// 	email: "senpaifishsticks@gmail.com",
	// });
	// console.log(user.data);
	return (
		<>
			<Head>
				<title>Kino</title>
				<meta
					name="description"
					content="Book tracker, created with t3 stack."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col items-center justify-center"></main>
		</>
	);
}
