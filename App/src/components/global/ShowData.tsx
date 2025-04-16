import { Fragment, isValidElement, memo, PropsWithChildren } from "react";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface Props extends PropsWithChildren {
  title: string;
  titleClass?: string;
  descriptionClass?: string;
}

function ShowData({ children, title, ...cProps }: Props) {
  function TitleWrapper(props: PropsWithChildren) {
    return (
      <VStack>
        <Text className={"text-sm md:text-xs " + cProps.titleClass}>
          {title}
        </Text>
        {isValidElement(children) ? (
          <Fragment>{children}</Fragment>
        ) : (
          <Text
            className={
              "text-lg md:text-md text-pretty font-bold " +
              cProps.descriptionClass
            }
          >
            {props.children}
          </Text>
        )}
      </VStack>
    );
  }

  if (typeof children === "string" || typeof children === "number") {
    return <TitleWrapper>{children}</TitleWrapper>;
  } else if (isValidElement(children)) {
    return <TitleWrapper>{children}</TitleWrapper>;
  } else {
    return <TitleWrapper>{JSON.stringify(children)}</TitleWrapper>;
  }
}

export default memo(ShowData);
