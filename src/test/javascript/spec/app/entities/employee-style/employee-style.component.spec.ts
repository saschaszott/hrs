import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WirvsvirusTestModule } from '../../../test.module';
import { EmployeeStyleComponent } from 'app/entities/employee-style/employee-style.component';
import { EmployeeStyleService } from 'app/entities/employee-style/employee-style.service';
import { EmployeeStyle } from 'app/shared/model/employee-style.model';

describe('Component Tests', () => {
  describe('EmployeeStyle Management Component', () => {
    let comp: EmployeeStyleComponent;
    let fixture: ComponentFixture<EmployeeStyleComponent>;
    let service: EmployeeStyleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [EmployeeStyleComponent]
      })
        .overrideTemplate(EmployeeStyleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeStyleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeStyleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EmployeeStyle(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeStyles && comp.employeeStyles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
