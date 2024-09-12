import { FONT_FAMILY } from "@/constants/config";
import { Href, Link } from "expo-router";
import { StyleProp, TextStyle } from "react-native";
import { Button, GetProps, Text } from "tamagui";

type Props = {
  activated?: boolean;
  link?: Href<string | object>;
  rootStyle?: StyleProp<TextStyle>;
} & GetProps<typeof Button>;

export const ButtonPrimary = ({
  activated = true,
  fontSize = "$8",
  link,
  rootStyle,
  ...props
}: Props): JSX.Element => {
  const renderButton = (style?: StyleProp<TextStyle>): JSX.Element => (
    <Button
      fontFamily={FONT_FAMILY}
      backgroundColor={activated ? "$yellowP" : "$black4"}
      borderColor={activated ? "$yellowP" : "$black4"}
      hoverStyle={{
        backgroundColor: activated ? "$yellow8" : "$blackP",
        borderColor: activated ? "$yellow8" : "$blackP",
      }}
      pressStyle={{
        backgroundColor: activated ? "$yellow8" : "$blackP",
        borderColor: "transparent",
      }}
      zIndex={1}
      alignSelf="center"
      style={style}
      {...props}
    >
      <Text
        fontFamily={"GangOfThree"}
        color={activated ? "$blackP" : "$whiteP"}
        fontSize={fontSize}
      >
        {props.children}
      </Text>
    </Button>
  );

  if (!link) return renderButton(rootStyle);

  return (
    <>
      <Link href={link} style={rootStyle} asChild replace>
        {renderButton()}
      </Link>
    </>
  );
};
