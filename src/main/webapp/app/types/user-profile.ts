export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  experienceInYears: number;
  employmentStylePreference: string[]; // ['Vollzeit', 'befristete', ...
  workingStylePreference: string[]; // 'HomeOffice' | 'Office' | 'Nature' ...
  professionalExperience: string[]; // 'IT' | 'Marketing'
  interests: string[]; // 'Handwerk' | ...
  aboutMe: string;
}
