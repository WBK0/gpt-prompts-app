import NextAuth, { Session, User as UserInterface } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      console.log(session)
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
});

export { handler as GET, handler as POST };