import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { WirvsvirusTestModule } from '../../../test.module';
import { UserProfileDetailComponent } from 'app/entities/user-profile/user-profile-detail.component';
import { UserProfile } from 'app/shared/model/user-profile.model';

describe('Component Tests', () => {
  describe('UserProfile Management Detail Component', () => {
    let comp: UserProfileDetailComponent;
    let fixture: ComponentFixture<UserProfileDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ userProfile: new UserProfile(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [UserProfileDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserProfileDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserProfileDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load userProfile on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userProfile).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
