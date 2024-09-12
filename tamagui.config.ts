import { config } from "@tamagui/config/v3";
import { createTamagui, TamaguiInternalConfig } from "tamagui";
import { themes } from "./theme";

const appConfig: TamaguiInternalConfig = createTamagui({
  ...config,
  themes,
});

export default appConfig;

export type AppConfig = typeof appConfig;

// Module augmentation
declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
