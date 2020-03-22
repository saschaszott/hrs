import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { WirvsvirusSharedModule } from 'app/shared/shared.module';
import { WirvsvirusCoreModule } from 'app/core/core.module';
import { WirvsvirusAppRoutingModule } from './app-routing.module';
import { WirvsvirusHomeModule } from './home/home.module';
import { WirvsvirusEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { PagesModule } from './pages/pages.module';
import { UserService } from './core/user/user.service';
import { UserServiceMock } from './services/user.service.mock';
import { CompanyService } from './entities/company/company.service';
import { CompanyServiceMock } from './services/company.service.mock';

@NgModule({
  imports: [
    BrowserModule,
    WirvsvirusSharedModule,
    WirvsvirusCoreModule,
    WirvsvirusHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    WirvsvirusEntityModule,
    WirvsvirusAppRoutingModule,
    PagesModule
  ],
  providers: [
    { provide: UserService, useClass: UserServiceMock },
    { provide: CompanyService, useClass: CompanyServiceMock }
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class WirvsvirusAppModule {}
