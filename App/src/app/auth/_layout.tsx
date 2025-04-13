import { logOut } from "@/src/features/auth/authApi";
import { verifyUserInfo } from "@/src/features/auth/authUtils";
import useAuth from "@/src/features/auth/useAuth";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isVerified = verifyUserInfo(userInfo);
    if (isVerified) {
      router.push("/");
    } else {
      logOut();
    }
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center items-center "
          keyboardShouldPersistTaps="handled"
        >
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
