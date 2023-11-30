import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/nav/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<div className="flex min-h-screen flex-col text-black">
				<div className="mx-auto flex h-full w-full max-w-6xl grow flex-col p-4">
					<Navbar />
					<Component {...pageProps} />

					<ToastContainer
						position="bottom-right"
						autoClose={2000}
						hideProgressBar={true}
						newestOnTop={true}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						pauseOnHover={false}
						theme="light"
					/>
				</div>
			</div>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
