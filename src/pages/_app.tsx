import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/nav/navbar";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<div className="flex min-h-screen flex-col text-black">
				<div className="mx-auto flex h-full w-full max-w-6xl grow flex-col p-4">
					<Navbar />
					<div className="flex h-full grow flex-col">
						<Component {...pageProps} />
					</div>
				</div>
			</div>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
