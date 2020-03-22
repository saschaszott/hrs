import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WirvsvirusTestModule } from '../../../test.module';
import { WorkingStyleDetailComponent } from 'app/entities/working-style/working-style-detail.component';
import { WorkingStyle } from 'app/shared/model/working-style.model';

describe('Component Tests', () => {
  describe('WorkingStyle Management Detail Component', () => {
    let comp: WorkingStyleDetailComponent;
    let fixture: ComponentFixture<WorkingStyleDetailComponent>;
    const route = ({ data: of({ workingStyle: new WorkingStyle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [WorkingStyleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(WorkingStyleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WorkingStyleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load workingStyle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.workingStyle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
