import { Stack } from "expo-router";
import { SafeArea } from "@/src/features/restaurants/components/utility/safe-area.component";

export default function RootLayout() {
  return (
    <SafeArea>
      <Stack screenOptions={{
        headerShown: false,
      }} />
    </SafeArea>
  );
}
