import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { QuestionComponentComponent } from './question-component/question-component.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SheetMakerComponent } from './sheet-maker/sheet-maker.component';

const appRoutes: Routes = [
  { path: 'questions/:p1', component: QuestionComponentComponent },
  { path: '', component: HomepageComponent },
  { path: 'sheetadmin', component: SheetMakerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponentComponent,
    HeaderComponent,
    HomepageComponent,
    SheetMakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes,
      {enableTracing: false}
      )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
