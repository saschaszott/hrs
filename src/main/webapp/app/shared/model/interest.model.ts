import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface IInterest {
  id?: number;
  interest?: string;
  userProfiles?: IUserProfile[];
}

export class Interest implements IInterest {
  constructor(public id?: number, public interest?: string, public userProfiles?: IUserProfile[]) {}
}
