import { backend } from "@/src/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyUserInfo } from "./authUtils";
import useAuth from "./useAuth";

interface ILoginProp {
  email: string;
  password: string;
}

interface ILoginResult {
  token: string;
  email: string;
  name?: string;
  role: string;
}
const { setInfo } = useAuth.getState();

export async function login(credentials: ILoginProp): Promise<ILoginResult> {
  const { data } = await backend.post("/auth/login", credentials);

  // save info to storage
  await AsyncStorage.setItem("userInfo", JSON.stringify(data));

  // active current session
  setInfo(data);

  return data as ILoginResult;
}

interface IRegister extends ILoginProp {
  name?: string;
}
export async function register(credentials: IRegister) {
  const { data } = await backend.post("/auth/register", credentials);
  return data;
}

export async function loadUserInfoFromStorage() {
  const data = (await AsyncStorage.getItem("userInfo")) || "{}";
  const parsed = JSON.parse(data);

  const isValidInfo = verifyUserInfo(parsed);
  if (!isValidInfo) {
    logOut();
    return;
  }

  // Refresh current session
  setInfo(parsed);
}

export async function logOut() {
  // clear storage
  await AsyncStorage.removeItem("userInfo");

  // clear current session
  setInfo(null);
}
