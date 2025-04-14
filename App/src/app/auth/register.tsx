import ShowAlert from "@/src/components/global/ShowAlert";
import { Button, ButtonText } from "@/src/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/src/components/ui/form-control";
import { Input, InputField } from "@/src/components/ui/input";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { register } from "../../features/auth/authApi";
import { isValidEmail, validatePassword } from "../../features/auth/authUtils";

export default function RegisterForm() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const emailInputRef = useRef<any>(null);
  const nameInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);
  const cpasswordInputRef = useRef<any>(null);

  function login() {
    router.push("/auth/login");
  }

  const mutation = useMutation({
    mutationFn: () => register({ name: userName, email, password }),
    onSuccess: () =>
      ShowAlert({
        title: "Account Created!",
        description: "Your account has been created Successfully.",
        buttonText: "Log in Now",
        buttonFn: login,
      }),
    onError: (error) => {
      setErrors(["Registration failed. Try again."]);
    },
  });

  const handleRegister = () => {
    const newErrors: string[] = [];
    if (!isValidEmail(email)) {
      newErrors.push("Invalid email format.");
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.push(passwordError);
    }
    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.");
    }
    setErrors(newErrors);
    if (newErrors.length === 0) {
      mutation.mutate();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      nameInputRef.current?.getNativeRef?.()?.then?.((ref: any) => {
        if (ref?.value) setUserName(ref.value);
      });

      emailInputRef.current?.getNativeRef?.()?.then?.((ref: any) => {
        if (ref?.value) setEmail(ref.value);
      });

      passwordInputRef.current?.getNativeRef?.()?.then?.((ref: any) => {
        if (ref?.value) setPassword(ref.value);
      });

      cpasswordInputRef.current?.getNativeRef?.()?.then?.((ref: any) => {
        if (ref?.value) setConfirmPassword(ref.value);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <VStack className="w-full gap-5 max-w-[320px] rounded-md border border-background-200 p-4">
      <Text className="text-xl font-bold text-center">📝 Register</Text>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Name</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            autoFocus
            value={userName}
            ref={nameInputRef as any}
            placeholder="Arman"
            autoCapitalize="none"
            onChangeText={setUserName}
            autoComplete="name"
            textContentType="name"
          />
        </Input>
      </FormControl>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={email}
            ref={emailInputRef as any}
            placeholder="example@mail.com"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            autoComplete="email"
            textContentType="emailAddress"
          />
        </Input>
      </FormControl>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            ref={passwordInputRef as any}
            value={password}
            placeholder="Minimum 6 characters"
            type="password"
            secureTextEntry
            onChangeText={setPassword}
            autoComplete="password"
            textContentType="password"
          />
        </Input>
      </FormControl>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Confirm Password</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            ref={cpasswordInputRef as any}
            value={confirmPassword}
            placeholder="Minimum 6 characters"
            type="password"
            secureTextEntry
            onChangeText={setConfirmPassword}
            autoComplete="password"
            textContentType="password"
          />
        </Input>
      </FormControl>

      {errors.length > 0 && (
        <VStack className="gap-1">
          {errors.map((err, idx) => (
            <Text key={idx} className="text-red-500 text-sm">
              • {err}
            </Text>
          ))}
        </VStack>
      )}
      <Button onPress={handleRegister} disabled={mutation.isPending}>
        <ButtonText>
          {mutation.isPending ? "Registering..." : "Register"}
        </ButtonText>
      </Button>
      <Text className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="cursor-pointer" asChild>
          <Text className="text-blue-600 underline font-semibold">Login</Text>
        </Link>
      </Text>
    </VStack>
  );
}
