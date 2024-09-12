import { ButtonPrimary } from "@/components/button/ButtonPrimary";
import { H1, Image, View } from "tamagui";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { PAGE_HEIGHT, PAGE_WIDTH } from "@/constants";
import { Pagination } from "@/components/pagination";
import { useSharedValue } from "react-native-reanimated";
import { FONT_FAMILY, LOCAL_FIRST_OPEN } from "@/constants/config";
import { useRef, useState } from "react";
import { storage } from "@/utils";

const data = [
  {
    image: require("@/assets/images/welcome/1.jpg"),
    title: "Welcome to MinhManga",
    button: "Next",
  },
  {
    image: require("@/assets/images/welcome/2.jpg"),
    title: "Update your manga continuously",
    button: "Next",
  },
  {
    image: require("@/assets/images/welcome/3.jpg"),
    title: "Discover now",
    button: "Start now",
  },
];

export default function WelcomeScreen(): JSX.Element {
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const handleSaveState = () => {
    storage.setData(LOCAL_FIRST_OPEN, true);
  };

  return (
    <View position="relative" height={PAGE_HEIGHT}>
      <ButtonPrimary
        link={currentIndex === data.length - 1 ? "/home" : undefined}
        rootStyle={{
          position: "absolute",
          bottom: "10%",
          zIndex: 1,
          alignSelf: "center",
        }}
        onPress={async () => {
          if (currentIndex !== data.length - 1)
            onPressPagination(currentIndex + 1);
          else handleSaveState();
        }}
      >
        {data[currentIndex]?.button}
      </ButtonPrimary>
      <Carousel
        ref={ref}
        loop={false}
        onProgressChange={(_, p) => {
          progress.value = p;
          setCurrentIndex(Math.ceil(p) > data.length - 1 ? 0 : Math.ceil(p));
        }}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={data}
        renderItem={({ item, index }) => (
          <View key={index}>
            <H1
              position="absolute"
              top="50%"
              color="$yellowP"
              zIndex={1}
              fontFamily={FONT_FAMILY}
              fontSize={"$10"}
              alignSelf="center"
              textAlign="center"
              textShadowColor={"$black1"}
              textShadowOffset={{ width: 1, height: 1 }}
              textShadowRadius={5}
            >
              {item.title}
            </H1>
            <Image
              source={item.image}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}
      />
      <Pagination.Basic
        data={data}
        progress={progress}
        size={15}
        containerStyle={{
          position: "absolute",
          bottom: "18%",
          gap: 5,
        }}
        activeDotStyle={{
          backgroundColor: "#f9cb55",
          borderRadius: 100,
          overflow: "hidden",
        }}
        dotStyle={{
          borderRadius: 100,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        onPress={onPressPagination}
      />
    </View>
  );
}
