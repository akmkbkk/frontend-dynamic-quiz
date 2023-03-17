import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './guards/auth.guard';
import { SheetMakerComponent } from './sheet-maker/sheet-maker.component';
import { QuestionComponentComponent } from './question-component/question-component.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'home', component: HomepageComponent, canActivate : [AuthGuard] },
  { path: 'sheetadmin', component: SheetMakerComponent,canActivate : [AuthGuard] },
  { path: 'questions/:p1', component: QuestionComponentComponent,canActivate : [AuthGuard] },
  { path: '**', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
