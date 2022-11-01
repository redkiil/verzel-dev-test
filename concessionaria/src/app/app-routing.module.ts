import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatevehicleComponent } from './components/createvehicle/createvehicle.component';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardInterceptor } from './interceptors/auth-guard-interceptor';

const routes: Routes = [
  { path: 'carros-usados', component: ListVehiclesComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'login', component: RegisterComponent },
  { path: 'veiculo', canActivate: [AuthGuardInterceptor], children: [ 
      { path: 'criar', component: CreatevehicleComponent },
      { path: 'editar/:id', component: CreatevehicleComponent }

  ]
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
