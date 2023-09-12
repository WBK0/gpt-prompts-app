import NextAuth, { AuthOptions, Session, User as UserInterface } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/email";
import User from '@models/user';
import { connectToDB } from '@utils/database';

// Define options for NextAuth
export const authOptions : AuthOptions = {
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        const sessionUser = await User.findOne({ email: user?.email });
        return {
          ...token,
          id: sessionUser?._id.toString(),
        }
      }

      return token;
    },
    async session({ session }: { session: Session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user?.email });
      
      if (sessionUser) {
        if (session.user) {
          session.user.id = sessionUser._id.toString();
        }
      }
    
      return session;
    },
    async signIn({user} : {user: UserInterface}) {
      try {
        await connectToDB();
    
        if (!user || !user.name || !user.email || !user.image) {
          throw new Error("Incomplete profile");
        }
    
        // Check if user exists in MongoDB
        const userExists = await User.findOne({ email: user.email });
    

        // If user does not exist, create new one
        if (!userExists) {
          await User.create({
            email: user.email,
            firstname: user.name.split(" ")[0],
            lastname: user.name.split(" ")[1],
            image: user.image,
          });
        }
    
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", (error as Error).message);
        return false;
      }
    }
  }
}


export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };