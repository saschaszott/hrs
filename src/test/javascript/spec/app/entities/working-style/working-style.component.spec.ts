import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WirvsvirusTestModule } from '../../../test.module';
import { WorkingStyleComponent } from 'app/entities/working-style/working-style.component';
import { WorkingStyleService } from 'app/entities/working-style/working-style.service';
import { WorkingStyle } from 'app/shared/model/working-style.model';

describe('Component Tests', () => {
  describe('WorkingStyle Management Component', () => {
    let comp: WorkingStyleComponent;
    let fixture: ComponentFixture<WorkingStyleComponent>;
    let service: WorkingStyleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [WorkingStyleComponent]
      })
        .overrideTemplate(WorkingStyleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkingStyleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkingStyleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WorkingStyle(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.workingStyles && comp.workingStyles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
