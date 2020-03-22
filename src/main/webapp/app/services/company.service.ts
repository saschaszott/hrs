// TODO: wuerfelda: Will be fixed if implemented.
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyProfile, Offer } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  public getProfile(companyId: string): Observable<CompanyProfile> {
    throw new Error('Not implemented yet');
  }

  public getOffers(companyId: string): Observable<Offer[]> {
    throw new Error('Not implemented yet');
  }

  public joinOffer(offerId: string, userId: string): Observable<Offer> {
    throw new Error('Not implemented yet');
  }
}
