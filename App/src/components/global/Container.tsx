import { PropsWithChildren } from "react";
import { Box } from "../ui/box";

interface Props extends PropsWithChildren {
  fullWidth?: boolean;
  className?: string;
}

export default function ({ fullWidth, children, className }: Props) {
  const width = fullWidth ? "w-full" : "w-full max-w-[500px] self-center p-2";

  return <Box className={width + " " + className}>{children}</Box>;
}
