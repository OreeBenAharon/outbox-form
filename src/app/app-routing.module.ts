import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './components/first/first.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: "/register-hachamama/first", component: FirstComponent},
  {path: "/register-hachamama/:id", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
