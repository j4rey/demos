import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { TranslateComponent } from './translate/translate.component';
import { TrackbyComponent } from './trackby/trackby.component';
import { PipeableOperatorComponent } from './pipeable-operator/pipeable-operator.component';
import { MappingComponent } from './mapping/mapping.component';
import { DeclarativeSubscriptionComponent } from './declarative-subscription/declarative-subscription.component';
import { ChainingoperatorComponent } from './chainingoperator/chainingoperator.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  { path: 'translate', component: TranslateComponent},
  { path: 'trackby', component: TrackbyComponent},
  { path: 'pipeable', component: PipeableOperatorComponent},
  { path: 'mapping', component: MappingComponent},
  { path: 'declarative', component: DeclarativeSubscriptionComponent},
]



@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    TrackbyComponent,
    PipeableOperatorComponent,
    MappingComponent,
    DeclarativeSubscriptionComponent,
    ChainingoperatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
