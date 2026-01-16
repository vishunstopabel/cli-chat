import keytar from "keytar";
const SERVICE_NAME = "shellchat";
const ACCOUNT_NAME = "authToken";
export const saveToken = async (token: string) => {
  await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
};

export const getToken = async (): Promise<string | null> => {
  return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
};

export const clearToken = async () => {
  await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
};
