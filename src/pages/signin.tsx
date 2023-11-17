import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";

export default function SignIn({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const providerLogos: Record<string, string | StaticImport> = {
		Google: "/logos/google-logo.png",
		Discord: "/logos/discord-logo.png",
	};
	return (
		<div className="h-full grow">
			<div className="mx-auto w-fit p-4 md:rounded-xl bg-white">
				<p className="mb-4 text-center text-2xl font-bold">Sign In</p>
				<div className="flex flex-col justify-center gap-4 text-center">
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<button
								className="rounded-md bg-black px-10 py-2 text-center text-sm font-semibold text-white mx-auto items-center hover:bg-black/90 transition duration-100 ease-in flex gap-4"
								onClick={() => void signIn(provider.id)}
							>
								<Image
									src={providerLogos[provider.name] ?? ""}
									width={20}
									height={20}
									alt={provider.name}
								/>
								Sign in with {provider.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const providers = await getProviders();

	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { destination: "/" },
		};
	}

	return {
		props: { providers: providers ?? [] },
	};
}
