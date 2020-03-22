import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WirvsvirusTestModule } from '../../../test.module';
import { EmployeeStyleDetailComponent } from 'app/entities/employee-style/employee-style-detail.component';
import { EmployeeStyle } from 'app/shared/model/employee-style.model';

describe('Component Tests', () => {
  describe('EmployeeStyle Management Detail Component', () => {
    let comp: EmployeeStyleDetailComponent;
    let fixture: ComponentFixture<EmployeeStyleDetailComponent>;
    const route = ({ data: of({ employeeStyle: new EmployeeStyle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [EmployeeStyleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeeStyleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeStyleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load employeeStyle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employeeStyle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
