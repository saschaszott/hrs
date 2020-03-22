import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';

type EntityResponseType = HttpResponse<IProfessionalExperience>;
type EntityArrayResponseType = HttpResponse<IProfessionalExperience[]>;

@Injectable({ providedIn: 'root' })
export class ProfessionalExperienceService {
  public resourceUrl = SERVER_API_URL + 'api/professional-experiences';

  constructor(protected http: HttpClient) {}

  create(professionalExperience: IProfessionalExperience): Observable<EntityResponseType> {
    return this.http.post<IProfessionalExperience>(this.resourceUrl, professionalExperience, { observe: 'response' });
  }

  update(professionalExperience: IProfessionalExperience): Observable<EntityResponseType> {
    return this.http.put<IProfessionalExperience>(this.resourceUrl, professionalExperience, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfessionalExperience>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfessionalExperience[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
