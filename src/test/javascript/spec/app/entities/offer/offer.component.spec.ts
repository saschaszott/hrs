import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WirvsvirusTestModule } from '../../../test.module';
import { OfferComponent } from 'app/entities/offer/offer.component';
import { OfferService } from 'app/entities/offer/offer.service';
import { Offer } from 'app/shared/model/offer.model';

describe('Component Tests', () => {
  describe('Offer Management Component', () => {
    let comp: OfferComponent;
    let fixture: ComponentFixture<OfferComponent>;
    let service: OfferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [OfferComponent]
      })
        .overrideTemplate(OfferComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfferComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Offer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.offers && comp.offers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
