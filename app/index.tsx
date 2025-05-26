import { Redirect } from 'expo-router';

export default function Index() {
  // always go to our standalone splash route first
  return <Redirect href="/splash" />;
} 