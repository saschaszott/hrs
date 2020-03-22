import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWorkingStyle } from 'app/shared/model/working-style.model';

type EntityResponseType = HttpResponse<IWorkingStyle>;
type EntityArrayResponseType = HttpResponse<IWorkingStyle[]>;

@Injectable({ providedIn: 'root' })
export class WorkingStyleService {
  public resourceUrl = SERVER_API_URL + 'api/working-styles';

  constructor(protected http: HttpClient) {}

  create(workingStyle: IWorkingStyle): Observable<EntityResponseType> {
    return this.http.post<IWorkingStyle>(this.resourceUrl, workingStyle, { observe: 'response' });
  }

  update(workingStyle: IWorkingStyle): Observable<EntityResponseType> {
    return this.http.put<IWorkingStyle>(this.resourceUrl, workingStyle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorkingStyle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkingStyle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
