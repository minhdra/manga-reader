import { H3, Square, Text } from "tamagui";
import { SafeAreaView } from "react-native";

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <Text color="$red10">Explore</Text>
      <Square
        borderColor="$borderColor"
        animation="bouncy"
        elevation="$4"
        backgroundColor="#222"
        size={104}
        borderRadius="$9"
        hoverStyle={{
          scale: 1.2,
        }}
        pressStyle={{
          scale: 0.9,
        }}
      >
        <H3>Hello</H3>
      </Square>
    </SafeAreaView>
  );
}
