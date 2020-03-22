import { Component, OnInit } from '@angular/core';
import { CompanyProfile } from '../../types';
import { of, Observable } from 'rxjs';

const MOCK_COMPANIES: CompanyProfile[] = [
  {
    id: '1',
    name: 'Bäcker 123',
    address: '20km entfernt',
    imgSrc: ''
  },
  {
    id: '2',
    name: 'Bäcker 123',
    address: '20km entfernt',
    imgSrc: ''
  },
  {
    id: '3',
    name: 'Bauer um die Ecke',
    address: '20km entfernt',
    imgSrc: ''
  },
  {
    id: '4',
    name: 'Bäcker 123',
    address: '20km entfernt',
    imgSrc: ''
  },
  {
    id: '5',
    name: 'Bäcker 123',
    address: '20km entfernt',
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
