import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the onboarding screen when the app starts
  return <Redirect href="/onboarding" />;
} 