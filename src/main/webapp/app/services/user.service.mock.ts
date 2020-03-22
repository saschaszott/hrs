// Should be ok because this is just a Mock.
/* eslint-disable no-console */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SAMPLE_USER_PROFILE } from './mocks';
import { UserProfile } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {
  public getProfile(userId: string): Observable<UserProfile> {
    console.log(`Get profile for user with id '${userId}'.`);
    return of(SAMPLE_USER_PROFILE);
  }
}
