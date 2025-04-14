import { Alert, Platform } from "react-native";

interface Props {
  title: string;
  description?: string;
  buttonText?: string;
  buttonFn?: () => void;
}
export default function (props: Props) {
  if (Platform.OS === "web") {
    alert(props.title + (props.description ? "\n" + props.description : ""));
    props.buttonFn && props.buttonFn();
    return;
  }

  Alert.alert(props.title, props.description, [
    {
      text: props.buttonText,
      onPress: props.buttonFn,
    },
  ]);
}
