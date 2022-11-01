import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ContentComponent } from './components/content/content.component';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { StoreModule } from '@ngrx/store'
import { filterReducer } from './store/filter.state';
import { EffectsModule } from '@ngrx/effects';
import { ListVehiclesEffect } from './store/list-vehicles.effect';
import { FilterButtonAddDirective } from './directives/filter-button-add.directive';
import { FilterButtonDelDirective } from './directives/filter-button-del.directive';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { ReactiveFormsModule } from "@angular/forms"
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { CreatevehicleComponent } from './components/createvehicle/createvehicle.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardInterceptor } from './interceptors/auth-guard-interceptor';
import { UserService } from './services/user.service';
import { FilterService } from './services/filter.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    ContentComponent,
    ListVehiclesComponent,
    FilterButtonAddDirective,
    FilterButtonDelDirective,
    RegisterComponent,
    CreatevehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgxSliderModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    HttpClientModule,
    StoreModule.forRoot({app: filterReducer}),
    EffectsModule.forRoot([ ListVehiclesEffect ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, [AuthGuardInterceptor], UserService, FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
