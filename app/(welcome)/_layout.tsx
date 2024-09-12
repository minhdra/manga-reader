import { LOCAL_FIRST_OPEN } from "@/constants/config";
import { storage } from "@/utils";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";

export default function WelcomeLayout(): JSX.Element {
  const [isFirstOpen, setIsFirstOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const isFirstOpen = await storage.getData(LOCAL_FIRST_OPEN);
      setIsFirstOpen(isFirstOpen);
    })();
  }, []);

  if (isFirstOpen) return <Redirect href={"/home"} />;

  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{ tabBarStyle: { display: "none" } }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
