import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession,
} from "next-auth/react";
import { useSSX } from "@spruceid/ssx-react";

import { api } from "~/utils/api";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  //   const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { push: navigateTo } = useRouter();
  const { data: session, status } = useSession();
  const { ssx, ssxLoaded } = useSSX();

  const signIn = async () => {
    try {
      await ssx?.signIn();
    } catch (e) {
      console.error(e);
    }
  };

  const signOut = async () => {
    try {
      await ssx?.signOut();
    } catch (e) {
      console.error(e);
    }
    // await nextAuthSignOut({ callbackUrl: "/" }); // { callbackUrl: "/" }
  };

  const { mutateAsync: testAddressPublic } =
    api.example.addressTestPublic.useMutation();

  const { mutateAsync: testAddressProtected } =
    api.example.addressTestProtected.useMutation();

  const { address: addressWallet } = useAccount();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          {addressWallet} | {status}
        </div>
        <ConnectButton />
        <button
          // eslint-disable-next-line
          onClick={async () => {
            await signIn?.();
          }}
        >
          sign in
        </button>
        <br />

        <button
          // eslint-disable-next-line
          onClick={async () => {
            await signOut?.();
          }}
        >
          sign out
        </button>
        <br />

        <button
          // eslint-disable-next-line
          onClick={async () => {
            const addr = await testAddressPublic?.();
            console.log("ADDR public", addr);
          }}
        >
          test public
        </button>
        <br />
        <button
          // eslint-disable-next-line
          onClick={async () => {
            const addr = await testAddressProtected?.();
            console.log("ADDR protected", addr);
          }}
        >
          test protected
        </button>
        <br />
      </div>
    </>
  );
};

export default Home;
