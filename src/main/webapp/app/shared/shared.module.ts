import { NgModule } from '@angular/core';
import { WirvsvirusSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { OfferListEntryComponent } from './components/offer-list-entry/offer-list-entry.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { CompetenceListEntryComponent } from './components/competence-list-entry/competence-list-entry.component';

const CONTROL_COMPONENTS = [
  AvatarComponent,
  ButtonComponent,
  SearchBarComponent,
  NavigationBarComponent,
  OfferListEntryComponent,
  UploadPhotoComponent,
  CompetenceListEntryComponent
];

@NgModule({
  imports: [WirvsvirusSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    CONTROL_COMPONENTS
  ],
  entryComponents: [LoginModalComponent],
  exports: [
    WirvsvirusSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    CONTROL_COMPONENTS
  ]
})
export class WirvsvirusSharedModule {}
