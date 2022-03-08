import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailerComponent } from './components/emailer/emailer.component';
import { FirstComponent } from './components/first/first.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: "reg", component: FirstComponent},
  {path: "", component: FirstComponent},
  {path: "final/:id", component: MainComponent},

  // {path: "", component: EmailerComponent},
  // {path: "**", pathMatch:"full", component: EmailerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
