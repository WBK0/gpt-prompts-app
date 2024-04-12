import NextAuth, { AuthOptions, Session, User as UserInterface } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@models/user';
import { connectToDB } from '@utils/database';
import { compare } from 'bcryptjs';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@app/api/mongodb';
import { Adapter } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';
import { cookies } from 'next/headers';

// Define options for NextAuth
export const authOptions : AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) { 
        await connectToDB();

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await User.findOne({ email: credentials?.email });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        if(!user.isActive){
          throw new Error("Account is not active");
        }
        
        return {
          email: user.email,
          id: user._id.toString(),
          name: user.firstname + " " + user.lastname
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
      
    )
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user, account }) {
      await connectToDB();

      if(user) {
        const sessionUser = await User.findOne({ email: user?.email });
        return {
          ...token,
          id: sessionUser?._id.toString(),
          provider: account?.provider,
          generatedAt: Date.now()
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user?.email });

      const generatedAt = new Date(token.generatedAt as string);

      if(generatedAt < sessionUser.updatedAt){
        const cookieStore = cookies()
        cookieStore.delete('next-auth.session-token');
      }

      if (sessionUser) {
        if (session.user) {
          session.user.id = sessionUser._id.toString();
          session.user.provider = token?.provider;
        }
      }

      return session;
    },
    async signIn({user, account} : {user: UserInterface, account: any}) {
      if (account.provider === "google") {
        try {
          await connectToDB();

          if (!user || !user.name || !user.email || !user.image) {
            throw new Error("Incomplete profile");
          }
      
          return true;
        } catch (error) {
          console.log("Error checking if user exists: ", (error as Error).message);
          return false;
        }
      }
      if(account.provider === 'credentials'){
        return true;
      }
      return false;
    }
  }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };