import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WirvsvirusTestModule } from '../../../test.module';
import { UserProfileUpdateComponent } from 'app/entities/user-profile/user-profile-update.component';
import { UserProfileService } from 'app/entities/user-profile/user-profile.service';
import { UserProfile } from 'app/shared/model/user-profile.model';

describe('Component Tests', () => {
  describe('UserProfile Management Update Component', () => {
    let comp: UserProfileUpdateComponent;
    let fixture: ComponentFixture<UserProfileUpdateComponent>;
    let service: UserProfileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WirvsvirusTestModule],
        declarations: [UserProfileUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserProfileUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserProfileUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserProfileService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserProfile(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserProfile();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
