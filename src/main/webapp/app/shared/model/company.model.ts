import { IOffer } from 'app/shared/model/offer.model';

export interface ICompany {
  id?: number;
  name?: string;
  profilePictureContentType?: string;
  profilePicture?: any;
  offers?: IOffer[];
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public name?: string,
    public profilePictureContentType?: string,
    public profilePicture?: any,
    public offers?: IOffer[]
  ) {}
}
