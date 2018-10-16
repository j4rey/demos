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
import { CombinationComponent } from './combination/combination.component';
import { CombineLatestComponent } from './combination/combine-latest/combine-latest.component';
import { ConcatComponent } from './combination/concat/concat.component';
import { MergeComponent } from './combination/merge/merge.component';
import { StartwithComponent } from './combination/startwith/startwith.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  { path: 'translate', component: TranslateComponent},
  { path: 'trackby', component: TrackbyComponent},
  { path: 'pipeable', component: PipeableOperatorComponent},
  { path: 'mapping', component: MappingComponent},
  { path: 'declarative', component: DeclarativeSubscriptionComponent},
  { path: 'chainingoperators', component: ChainingoperatorComponent},
  { path: 'combination', component: CombinationComponent,
    children: [
      {path: 'combinelatest', component: CombineLatestComponent},
      {path: 'concat', component: ConcatComponent},
      {path: 'merge', component: MergeComponent},
      {path: 'startwith', component: StartwithComponent}
    ]
  },
]



@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    TrackbyComponent,
    PipeableOperatorComponent,
    MappingComponent,
    DeclarativeSubscriptionComponent,
    ChainingoperatorComponent,
    CombinationComponent,
    CombineLatestComponent,
    ConcatComponent,
    MergeComponent,
    StartwithComponent
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
