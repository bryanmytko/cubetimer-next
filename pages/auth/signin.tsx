import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { Button } from "@nextui-org/react";

import Logo from "../../components/Header/Logo";
import authOptions from "../api/auth/[...nextauth]";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="flex mt-20">
        <div className="w-1/3 mx-auto bg-gray-300 rounded-lg">
          <div className="px-20 py-4 mx-auto rounded-t-lg bg-cyan-800">
            <Logo />
          </div>
          <p className="pt-6 text-lg text-center">Login or Signup</p>
          <div className="w-full pb-8 mt-6">
            {Object.values(providers).reverse().map((provider) => (
              <div key={provider.name} className="mb-4">
                <Button onClick={async () => await signIn(provider.id, { callbackUrl: "/" })} size="xl" css={{ background: "#fff", margin: "auto" }}>
                  {provider.name === "Google" && <svg className="inline pr-12" viewBox="0 0 32 32" width="32" height="32"><defs><path id="A" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="B"><use xlinkHref="#A" /></clipPath><g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)"><path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" /><path d="M0 11l17 13 7-6.1L48 14V0H0z" clipPath="url(#B)" fill="#ea4335" /><path d="M0 37l30-23 7.9 1L48 0v48H0z" clipPath="url(#B)" fill="#34a853" /><path d="M48 48L17 24l-4-3 35-10z" clipPath="url(#B)" fill="#4285f4" /></g></svg>
                  }
                  {provider.name === "GitHub" &&
                    <svg className="inline pr-12" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
                      <g id="surface1">
                        <path d="M 15.953125 0 C 7.132812 0 0 7.332031 0 16.40625 C 0 23.65625 4.570312 29.796875 10.90625 31.96875 C 11.699219 32.132812 11.992188 31.617188 11.992188 31.183594 C 11.992188 30.800781 11.964844 29.496094 11.964844 28.140625 C 7.527344 29.117188 6.601562 26.183594 6.601562 26.183594 C 5.890625 24.28125 4.832031 23.792969 4.832031 23.792969 C 3.378906 22.789062 4.9375 22.789062 4.9375 22.789062 C 6.550781 22.898438 7.394531 24.472656 7.394531 24.472656 C 8.820312 26.972656 11.117188 26.265625 12.042969 25.832031 C 12.175781 24.769531 12.597656 24.039062 13.046875 23.628906 C 9.507812 23.25 5.785156 21.839844 5.785156 15.535156 C 5.785156 13.742188 6.417969 12.277344 7.421875 11.136719 C 7.261719 10.730469 6.707031 9.042969 7.582031 6.789062 C 7.582031 6.789062 8.925781 6.355469 11.964844 8.472656 C 13.265625 8.113281 14.605469 7.933594 15.953125 7.929688 C 17.300781 7.929688 18.671875 8.121094 19.941406 8.472656 C 22.976562 6.355469 24.324219 6.789062 24.324219 6.789062 C 25.195312 9.042969 24.640625 10.730469 24.484375 11.136719 C 25.511719 12.277344 26.121094 13.742188 26.121094 15.535156 C 26.121094 21.839844 22.398438 23.222656 18.832031 23.628906 C 19.414062 24.148438 19.914062 25.125 19.914062 26.671875 C 19.914062 28.871094 19.886719 30.636719 19.886719 31.179688 C 19.886719 31.617188 20.179688 32.132812 20.96875 31.96875 C 27.308594 29.796875 31.878906 23.65625 31.878906 16.40625 C 31.90625 7.332031 24.746094 0 15.953125 0 Z M 15.953125 0 " />
                      </g>
                    </svg>
                  }
                  <span className="text-black">Sign in with {provider.name}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, { ...authOptions });

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  }
}