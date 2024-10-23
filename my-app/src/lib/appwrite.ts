import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Set your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID'); // Set your project ID

export const account = new Account(client);
export { ID } from 'appwrite';