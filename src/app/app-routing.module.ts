import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EventComponent} from "./common/component/event/event.component";
import {SidenavComponent} from "./common/component/sidenav/sidenav.component";
import {AdminPageEventComponent} from "./common/component/admin-page/admin-page-event/admin-page-event.component";
import {AdminPageEventRequestsComponent} from "./common/component/admin-page/admin-page-event/admin-page-event-requests/admin-page-event-requests.component";
import {UpdateEventComponent} from "./common/component/event/update-event/update-event.component";
import {AdminPageUserComponent} from "./common/component/admin-page/admin-page-user/admin-page-user.component";
import {AdminPageUserRequestsComponent} from "./common/component/admin-page/admin-page-user/admin-page-user-requests/admin-page-user-requests.component";
import {IsHeadAdminGuard} from "./common/guard/isHeadAdmin.guard";
import {IsAdminGuard} from "./common/guard/isAdmin.guard";
import {ImageChangeComponent} from "./common/component/event/image-change/image-change.component";


const routes: Routes = [
  {
    path: '',
    component: SidenavComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (mod) => mod.AuthenticationModule
      )
  },
  {
    path: 'event',
    component: EventComponent
  },
  {
    path: 'admin/event',
    component: AdminPageEventComponent,
    canActivate: [IsAdminGuard]
  },
  {
    path: 'admin/user',
    component: AdminPageUserComponent,
    canActivate: [IsHeadAdminGuard]
  },
  {
    path: 'admin/event/requests',
    component: AdminPageEventRequestsComponent,
    canActivate: [IsHeadAdminGuard]

  },
  {
    path: 'admin/event/update',
    component: UpdateEventComponent,
    canActivate: [IsAdminGuard]
  },
  {
    path: 'admin/user/requests',
    component: AdminPageUserRequestsComponent,
    canActivate: [IsHeadAdminGuard]
  },
  {
    path: 'admin/event/images',
    component: ImageChangeComponent,
    canActivate: [IsAdminGuard]
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule ,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
