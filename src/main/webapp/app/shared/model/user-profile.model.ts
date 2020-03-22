import { IInterest } from 'app/shared/model/interest.model';
import { IWorkingStyle } from 'app/shared/model/working-style.model';
import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { IEmployeeStyle } from 'app/shared/model/employee-style.model';

export interface IUserProfile {
  id?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  experienceInYears?: number;
  aboutMe?: string;
  profilePictureContentType?: string;
  profilePicture?: any;
  telephoneLong?: string;
  interests?: IInterest[];
  workingStyles?: IWorkingStyle[];
  professionalExperiences?: IProfessionalExperience[];
  employeeStyles?: IEmployeeStyle[];
}

export class UserProfile implements IUserProfile {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public address?: string,
    public experienceInYears?: number,
    public aboutMe?: string,
    public profilePictureContentType?: string,
    public profilePicture?: any,
    public telephoneLong?: string,
    public interests?: IInterest[],
    public workingStyles?: IWorkingStyle[],
    public professionalExperiences?: IProfessionalExperience[],
    public employeeStyles?: IEmployeeStyle[]
  ) {}
}
