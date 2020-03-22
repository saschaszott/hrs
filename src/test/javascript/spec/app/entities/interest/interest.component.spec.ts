import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WirvsvirusTestModule } from '../../../test.module';
import { InterestComponent } from 'app/entities/interest/interest.component';
import { InterestService } from 'app/entities/interest/interest.service';
import { Interest } from 'app/shared/model/interest.model';

describe('Component Tests', () => {
  describe('Interest Management Component', () => {
    let comp: InterestComponent;
    let fixture: ComponentFixture<InterestComponent>;
    let service: InterestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [InterestComponent]
      })
        .overrideTemplate(InterestComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InterestComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InterestService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Interest(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.interests && comp.interests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
