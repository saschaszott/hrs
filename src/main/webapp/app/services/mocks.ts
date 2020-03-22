import { CompanyProfile } from '../types/company-profile';
import { Offer, UserProfile } from '../types';

export const SAMPLE_COMPANY_PROFILE: CompanyProfile = {
  id: '42',
  name: 'Bauer um die Ecke',
  address: '50677 Köln',
  imgSrc: 'https://via.placeholder.com/48'
};

export const SAMPLE_USER_PROFILE: UserProfile = {
  id: '4711',
  firstName: 'Max',
  lastName: 'Mustermann',
  address: '50677 Köln',
  experienceInYears: 42,
  employmentStylePreference: [],
  workingStylePreference: [],
  professionalExperience: ['Marketing'],
  interests: ['Muskelkraft'],
  aboutMe: ''
};

export const SAMPLE_OFFERS: Offer[] = [
  {
    name: 'Erdbeerernte',
    adress: '20 km entfernt',
    description: '',
    employmentStyle: [],
    professionalExperience: [],
    workingStyle: []
  },
  {
    name: 'Erdbeerernte',
    adress: '20 km entfernt',
    description: '',
    employmentStyle: [],
    professionalExperience: [],
    workingStyle: []
  },
  {
    name: 'Erdbeerernte',
    adress: '20 km entfernt',
    description: '',
    employmentStyle: [],
    professionalExperience: [],
    workingStyle: []
  },
  {
    name: 'Erdbeerernte',
    adress: '20 km entfernt',
    description: '',
    employmentStyle: [],
    professionalExperience: [],
    workingStyle: []
  }
];
