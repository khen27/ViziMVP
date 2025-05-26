// @ts-ignore
import { RAPIDAPI_KEY } from '@env';
console.log('RAPIDAPI_KEY', RAPIDAPI_KEY);
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface CityResult {
  id: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

export function useCitySearch(query: string) {
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    const fetchCities = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(
          'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
          {
            params: { namePrefix: query, limit: 5 },
            headers: {
              'X-RapidAPI-Key': RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );
        const list = resp.data.data.map((item: any) => ({
          id: item.id,
          city: item.city,
          region: item.region,
          country: item.country,
          countryCode: item.countryCode,
        }));
        setResults(list);
      } catch (e) {
        console.error(e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchCities, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
} 