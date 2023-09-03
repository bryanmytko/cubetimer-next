import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { Button } from "@nextui-org/react";
import Image from "next/image";

import Logo from "../../components/Header/Logo";
import authOptions from "../api/auth/[...nextauth]";

interface ButtonIconProps {
  url: string;
}

const ButtonIcon = (props: ButtonIconProps) => {
  const { url } = props;
  return <Image alt={url} src={`/assets/${url.toLowerCase()}.png`} />;
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="flex mt-20">
        <div className="mx-auto bg-gray-300 rounded-lg">
          <div className="flex justify-center py-4 mx-auto bg-yellow-400 border-black rounded-t-lg border-b-1">
            <Logo dark={true} />
          </div>
          <p className="pt-6 text-lg text-center">Login or Signup</p>
          <div className="w-full px-20 pb-8 mt-6">
            {Object.values(providers)
              .reverse()
              .map((provider) => (
                <div key={provider.name} className="mb-4">
                  <Button
                    onClick={async () =>
                      await signIn(provider.id, { callbackUrl: "/" })
                    }
                    className="bg-white border-gray-400 border-1"
                    size="lg"
                    startContent={<ButtonIcon url={provider.name} />}
                  >
                    <span className="inline-block text-black">
                      Sign in with {provider.name}
                    </span>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, {
    ...authOptions,
  });

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
