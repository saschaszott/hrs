import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOffer } from 'app/shared/model/offer.model';

type EntityResponseType = HttpResponse<IOffer>;
type EntityArrayResponseType = HttpResponse<IOffer[]>;

@Injectable({ providedIn: 'root' })
export class OfferService {
  public resourceUrl = SERVER_API_URL + 'api/offers';

  constructor(protected http: HttpClient) {}

  create(offer: IOffer): Observable<EntityResponseType> {
    return this.http.post<IOffer>(this.resourceUrl, offer, { observe: 'response' });
  }

  update(offer: IOffer): Observable<EntityResponseType> {
    return this.http.put<IOffer>(this.resourceUrl, offer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOffer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOffer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
