import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "@/actions/authActions";
import { compare } from "bcryptjs";

type UserCleaned = {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  email: string;
  email_verified: Date | null;
  image: string | null;
  passwordHash: string;
};

export default {
  providers: [
    GitHub,
    Credentials({
      name: "credentials",
      async authorize(creds) {
        console.log("eeeeeeeeeee");

        const validated = loginSchema.safeParse(creds);
        if (validated.success) {
          const { password, email } = validated.data;
          const user = await getUserByEmail(email);
          if (!user || !(await compare(password, user.passwordHash)))
            return null;

          const userCleaned: UserCleaned = {
            id: user.id.toString(),
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            email: user.email,
            email_verified: user.email_verified,
            image: user.image,
            passwordHash: user.passwordHash,
          };
          return userCleaned;
        }

        console.log(creds);
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
