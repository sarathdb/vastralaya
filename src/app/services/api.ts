import axios from 'axios';

interface Continent {
  id: number;
  name: string;
  // Add more properties as per your API response
}

export const getContinents = async (): Promise<Continent[]> => {
  try {
    const response = await axios.get('https://dummy-json.mock.beeceptor.com/continents');
    return response.data;
  } catch (error) {
    console.error('Error fetching continents:', error);
    throw error;
  }
};

// Example usage:
// import { getContinents } from './services/api';
//
// const fetchData = async () => {
//   try {
//     const continents = await getContinents();
//     console.log(continents);
//   } catch (error) {
//     // Handle error
//   }
// };
