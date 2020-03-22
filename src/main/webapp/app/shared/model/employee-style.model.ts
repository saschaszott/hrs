import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IOffer } from 'app/shared/model/offer.model';

export interface IEmployeeStyle {
  id?: number;
  employeeStyle?: string;
  userProfiles?: IUserProfile[];
  offers?: IOffer[];
}

export class EmployeeStyle implements IEmployeeStyle {
  constructor(public id?: number, public employeeStyle?: string, public userProfiles?: IUserProfile[], public offers?: IOffer[]) {}
}
