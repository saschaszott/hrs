import { Component, OnInit } from '@angular/core';
import { CompanyProfile } from '../../types';
import { of, Observable } from 'rxjs';

const MOCK_COMPANIES: CompanyProfile[] = [
  {
    id: '1',
    name: 'Bäcker A',
    address: '20 km von Dir entfernt',
    imgSrc: ''
  },
  {
    id: '2',
    name: 'Bäcker B',
    address: '22 km von Dir entfernt',
    imgSrc: ''
  },
  {
    id: '3',
    name: 'Bauer C',
    address: '26 km von Dir entfernt',
    imgSrc: ''
  },
  {
    id: '4',
    name: 'Bauer D',
    address: '200 km von Dir entfernt',
    imgSrc: ''
  },
  {
    id: '5',
    name: 'Bäcker E',
    address: '24 km von Dir entfernt',
    imgSrc: ''
  }
];

@Component({
  selector: 'jhi-company-search-page',
  templateUrl: './company-search-page.component.html',
  styleUrls: ['./company-search-page.component.scss']
})
export class CompanySearchPageComponent implements OnInit {
  public companies$: Observable<CompanyProfile[]> | undefined;

  constructor() {
    // TODO: wuerfelda: Inject a service fetching all available competences.
  }

  ngOnInit(): void {
    // TODO: wuefelda: Will be fetched from a service.
    this.companies$ = of(MOCK_COMPANIES);
  }
}
