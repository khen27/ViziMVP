import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  BackButton,
  Header,
  AutocompleteInput,
  Toggle,
  FooterNav,
} from '../../components/ui';

const SUGGESTIONS = [
  { city: 'New York', region: 'NY', countryCode: 'US' },
  { city: 'Los Angeles', region: 'CA', countryCode: 'US' },
  { city: 'Chicago', region: 'IL', countryCode: 'US' },
  { city: 'Houston', region: 'TX', countryCode: 'US' },
  { city: 'Phoenix', region: 'AZ', countryCode: 'US' },
  { city: 'San Francisco', region: 'CA', countryCode: 'US' },
  { city: 'Miami', region: 'FL', countryCode: 'US' },
  { city: 'Austin', region: 'TX', countryCode: 'US' },
  { city: 'Seattle', region: 'WA', countryCode: 'US' },
  { city: 'Boston', region: 'MA', countryCode: 'US' },
];

export default function HomeCityScreen() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [selected, setSelected] = useState<{ city: string; region: string; countryCode: string } | null>(null);
  const [show, setShow] = useState(true);

  const filtered = text.length > 0
    ? SUGGESTIONS.filter(
        s =>
          s.city.toLowerCase().includes(text.toLowerCase()) ||
          s.region.toLowerCase().includes(text.toLowerCase())
      )
    : [];

  return (
    <ScreenContainer gradient={['#836CE8', '#4694FD']} archHeight={200}>
      <BackButton />
      <Header
        title="Where's home for you?"
        subtitle="Choose your hometown to help others connect with you more easily."
      />
      <AutocompleteInput
        placeholder="e.g. Miami, FL"
        value={selected ? `${selected.city}, ${selected.region}` : text}
        onChangeText={setText}
        suggestions={filtered}
        onSelect={item => {
          setSelected(item);
          setText(`${item.city}, ${item.region}`);
        }}
      />
      <Toggle
        label="Show on your profile"
        helperText="Let others see this on your profile"
        value={show}
        onValueChange={setShow}
      />
      <FooterNav
        left={{
          label: 'Skip',
          onPress: () => router.replace('/main'),
        }}
        right={{
          label: 'Continue',
          onPress: () => router.push('/next'),
          disabled: !selected,
        }}
      />
    </ScreenContainer>
  );
} 