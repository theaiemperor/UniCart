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
import { login } from "../../features/auth/authApi";
import { isValidEmail } from "../../features/auth/authUtils";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const mutation = useMutation({
    mutationFn: () => login({ email, password }),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      setErrors([error.message]);
    },
  });

  const handleSubmit = () => {
    const newErrors = [];

    if (!isValidEmail(email)) {
      newErrors.push("Please enter a valid email.");
    }

    if (password.length < 6) {
      newErrors.push("Password must be at least 6 characters.");
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      mutation.mutate();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      emailInputRef.current?.getNativeRef?.()?.then?.((ref: any) => {
        if (ref?.value) setEmail(ref.value);
      });

      passwordInputRef.current?.getNativeRef?.()?.then?.((ref: any) => {
        if (ref?.value) setPassword(ref.value);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <VStack className="w-full gap-5 max-w-[320px] rounded-md border border-background-200 p-4">
      <Text className="text-xl font-bold text-center">🔐 Login</Text>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            ref={emailInputRef as any}
            value={email}
            onChangeText={setEmail}
            placeholder="example@mail.com"
            autoCapitalize="none"
            keyboardType="email-address"
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
            onChangeText={setPassword}
            placeholder="Your password"
            secureTextEntry
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

      <Button onPress={handleSubmit} disabled={mutation.isPending}>
        <ButtonText>
          {mutation.isPending ? "Logging in..." : "Login"}
        </ButtonText>
      </Button>
      <Text className="text-center text-sm">
        Not have an account?{" "}
        <Link href="/auth/register" className="cursor-pointer" asChild>
          <Text className="text-blue-600 underline font-semibold">
            Register
          </Text>
        </Link>
      </Text>
    </VStack>
  );
}
