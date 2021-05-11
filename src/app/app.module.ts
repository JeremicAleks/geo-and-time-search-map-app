import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import {MarkerService} from "./common/service/marker.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav"
import { SidenavComponent  } from './common/component/sidenav/sidenav.component';
import { AppRoutingModule } from './app-routing.module';
import { EventComponent } from './common/component/event/event.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { AdminPageEventComponent } from './common/component/admin-page/admin-page-event/admin-page-event.component';
import { AdminPageEventTableComponent } from './common/component/admin-page/admin-page-event/admin-page-event-table/admin-page-event-table.component';
import { AdminPageEventNavigationComponent } from './common/component/admin-page/admin-page-event/admin-page-event-navigation/admin-page-event-navigation.component';
import { AdminPageEventRequestsComponent } from './common/component/admin-page/admin-page-event/admin-page-event-requests/admin-page-event-requests.component';
import {ToastrModule} from "ngx-toastr";
import { UpdateEventComponent } from './common/component/event/update-event/update-event.component';
import {HttpTokenInterceptor} from "./core/injector/httpTokenInterceptor";
import {AuthenticationGuard} from "./common/guard/authentication.guard";
import {IsAdminGuard} from "./common/guard/isAdmin.guard";
import {IsUserGuard} from "./common/guard/isUser.guard";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { AdminPageUserComponent } from './common/component/admin-page/admin-page-user/admin-page-user.component';
import { AdminPageNavigationComponent } from './common/component/admin-page/admin-page-navigation/admin-page-navigation.component';
import { AdminPageHeaderComponent } from './common/component/admin-page/admin-page-header/admin-page-header.component';
import { AdminPageUserTableComponent } from './common/component/admin-page/admin-page-user/admin-page-user-table/admin-page-user-table.component';
import { AdminPageUserNavigationComponent } from './common/component/admin-page/admin-page-user/admin-page-user-navigation/admin-page-user-navigation.component';
import { AdminPageUserRequestsComponent } from './common/component/admin-page/admin-page-user/admin-page-user-requests/admin-page-user-requests.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidenavComponent,
    EventComponent,
    AdminPageEventComponent,
    AdminPageEventTableComponent,
    AdminPageEventNavigationComponent,
    AdminPageEventRequestsComponent,
    UpdateEventComponent,
    AdminPageUserComponent,
    AdminPageNavigationComponent,
    AdminPageHeaderComponent,
    AdminPageUserTableComponent,
    AdminPageUserNavigationComponent,
    AdminPageUserRequestsComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        AppRoutingModule,
        MatIconModule,
        MatMenuModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatOptionModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        NgbCarouselModule,
        MatExpansionModule,
        MatSelectModule

    ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:HttpTokenInterceptor,multi:true},
    MarkerService,
    AuthenticationGuard,
    IsAdminGuard,
    IsUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
