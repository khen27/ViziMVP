import { Redirect } from 'expo-router';

export default function Index() {
  // You can add logic here to check if user needs onboarding
  const needsOnboarding = true;

  if (needsOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
} 