import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IOffer } from 'app/shared/model/offer.model';

export interface IProfessionalExperience {
  id?: number;
  professionalExperience?: string;
  userProfiles?: IUserProfile[];
  offers?: IOffer[];
}

export class ProfessionalExperience implements IProfessionalExperience {
  constructor(public id?: number, public professionalExperience?: string, public userProfiles?: IUserProfile[], public offers?: IOffer[]) {}
}
