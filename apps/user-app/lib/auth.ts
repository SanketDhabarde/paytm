import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentails",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "1234567890",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const encryptPassword = await bcrypt.hash(
          credentials?.password || "",
          10
        );

        const existingUser = await db.user.findFirst({
          where: {
            phone: credentials?.phone,
          },
        });

        if (existingUser) {
          const compare = await bcrypt.compare(
            credentials?.password || "",
            existingUser.password
          );
          if (compare) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              phone: credentials?.phone,
              password: encryptPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    session({ session, token }: { session: Session; token: JWT }) {
      const newSession = {
        ...session,
        user: { ...session.user, id: token.sub },
      };
      return newSession;
    },
  },
};
