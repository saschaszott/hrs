import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IOffer } from 'app/shared/model/offer.model';

export interface IWorkingStyle {
  id?: number;
  workingStyle?: string;
  userProfiles?: IUserProfile[];
  offers?: IOffer[];
}

export class WorkingStyle implements IWorkingStyle {
  constructor(public id?: number, public workingStyle?: string, public userProfiles?: IUserProfile[], public offers?: IOffer[]) {}
}
