import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6607f6b3067cc65e2dcf");
export const account = new Account(client);
export { ID } from "appwrite";
