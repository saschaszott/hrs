import { ICompany } from 'app/shared/model/company.model';
import { IWorkingStyle } from 'app/shared/model/working-style.model';
import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { IEmployeeStyle } from 'app/shared/model/employee-style.model';

export interface IOffer {
  id?: number;
  title?: string;
  address?: string;
  description?: string;
  telephoneLong?: string;
  companies?: ICompany[];
  workingStyles?: IWorkingStyle[];
  professionalExperiences?: IProfessionalExperience[];
  employeeStyles?: IEmployeeStyle[];
}

export class Offer implements IOffer {
  constructor(
    public id?: number,
    public title?: string,
    public address?: string,
    public description?: string,
    public telephoneLong?: string,
    public companies?: ICompany[],
    public workingStyles?: IWorkingStyle[],
    public professionalExperiences?: IProfessionalExperience[],
    public employeeStyles?: IEmployeeStyle[]
  ) {}
}
