/**
 * ! Defintion des AuthOptions pour l'authentification des utilisateurs
 * ! C'est une config olbligatoire de next auth
 */

// ! Import des bibliotheques de nextAuth
// ? Import de NextAuthOptions pour le typage
import { NextAuthOptions } from "next-auth";
// ? Import des Providers (Connexion avec Github ou sans)
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
// ? Pour le hash du mot de passe
import bcrypt from "bcryptjs";
// ? Connexion et Model pour l'authentification
import Mongoose_connection from "./mongoDB";
import { userModel } from "../models/User";

// ! Declaration des AuthOptions
export const authOptions: NextAuthOptions = {
  providers: [
    // ? Connexion avec GitHub
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ? Connexion avec email et le mot de passe
    CredentialsProvider({
      name: "Credentials to sign in",
      credentials: {},

      // ? Fonction pour verifier si l'utilisateur existe
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await Mongoose_connection();
          const user = await userModel.findOne({ email });

          if (!user) return null; // ? Utilisateur non trouvé

          const passwordsMatch = await bcrypt.compare(password, user?.password); // ? Compare le mot de passe saisi avec celui dans la base de données

          if (!passwordsMatch) return null; // ? Mot de passe incorrect

          return user; // ? Retourne l'utilisateur pour la session
        } catch (error) {
          console.log("Error: ", error);
          return null; // ? En cas d'erreur, retourne null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige toujours vers le dashboard après login
      return "/v1/Accueil";
    },
  },
};
