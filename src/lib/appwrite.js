import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("663b149600237c067b72");
export const account = new Account(client);
export { ID } from "appwrite";

export const databases = new Databases(client);
// databases.cre
