import keytar from "keytar";
const SERVICE_NAME = "shellchat";
const ACCOUNT_NAME = "authToken";
export const saveToken = async (token) => {
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
};
export const getToken = async () => {
    return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
};
export const clearToken = async () => {
    await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
};
