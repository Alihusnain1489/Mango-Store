import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const user = await User.findOne({
          email: credentials.email.toLowerCase().trim(),
        }).lean() as { _id: unknown; name: string; email: string; passwordHash: string; role: string } | null;

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return {
          id:    String(user._id),
          name:  user.name,
          email: user.email,
          role:  user.role,       // ← include role in token
        };
      },
    }),
  ],

  callbacks: {
    // Persist role in the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id;
        token.role = (user as { role?: string }).role ?? 'customer';
      }
      return token;
    },
    // Expose role on the session object
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id   = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn:  '/login',
    signOut: '/login',
    error:   '/login',
  },

  session: { strategy: 'jwt' },
  secret:  process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);