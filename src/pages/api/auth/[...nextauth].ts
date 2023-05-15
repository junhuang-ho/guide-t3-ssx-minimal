import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { authOptions } from "~/server/auth";
// export default NextAuth(authOptions);

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  const authOpts: NextAuthOptions = authOptions({ req });

  const isDefaultSigninPage =
    req.method === "GET" && req?.query?.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    // Removes from the authOptions.providers array
    authOpts.providers.pop();
  }

  return NextAuth(req, res, authOpts) as typeof NextAuth;
};

// Exports
// ========================================================
export default Auth;

// import type { NextApiRequest, NextApiResponse } from "next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { SSXNextAuth } from "@spruceid/ssx-react/next-auth/backend";
// import { SSXServer } from "@spruceid/ssx-server";

// import { env } from "~/env.mjs";

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   const ssxConfig = {};
//   const ssx = new SSXServer(ssxConfig);
//   const { credentials, authorize } = SSXNextAuth(req, ssx);

//   const providers = [
//     CredentialsProvider({
//       name: "Ethereum",
//       credentials,
//       authorize,
//     }),
//   ];

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return await NextAuth(req, res, {
//     providers,
//     session: {
//       strategy: "jwt",
//     },
//     secret: env.NEXTAUTH_SECRET,
//     callbacks: {
//       session: (sessionData) => {
//         const { session, user, token } = sessionData;
//         if (session.user) {
//           session.user.name = token.sub;
//         }
//         return session;
//       },
//     },
//   });
// }
