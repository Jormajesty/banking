'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";

export const signIn = async () => {
    try {
        // Mutation / Database / Make fetch
    } catch (error) {
        console.log('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), 
        email, 
        password, 
        `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("my-custom-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
    } catch (error) {
        console.log('Error', error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  }
  