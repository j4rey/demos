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
import { WithlatestfromComponent } from './combination/withlatestfrom/withlatestfrom.component';
import { CreationComponent } from './creation/creation.component';
import { FromComponent } from './creation/from/from.component';
import { OfComponent } from './creation/of/of.component';
import { ErrorhandlingComponent } from './errorhandling/errorhandling.component';
import { CatcherrorComponent } from './errorhandling/catcherror/catcherror.component';
import { FilteringComponent } from './filtering/filtering.component';
import { DebouncetimeComponent } from './filtering/debouncetime/debouncetime.component';
import { DistinctuntilchangedComponent } from './filtering/distinctuntilchanged/distinctuntilchanged.component';
import { FilterComponent } from './filtering/filter/filter.component';
import { TakeComponent } from './filtering/take/take.component';
import { TakeuntilComponent } from './filtering/takeuntil/takeuntil.component';
import { MulticastingComponent } from './multicasting/multicasting.component';
import { ShareComponent } from './multicasting/share/share.component';
import { ShareReplayComponent } from './multicasting/share-replay/share-replay.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  { path: 'translate', component: TranslateComponent },
  { path: 'trackby', component: TrackbyComponent },
  { path: 'pipeable', component: PipeableOperatorComponent },
  { path: 'mapping', component: MappingComponent },
  { path: 'declarative', component: DeclarativeSubscriptionComponent },
  {
    path: 'combination', component: CombinationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'combinelatest' },
      { path: 'combinelatest', component: CombineLatestComponent },
      { path: 'concat', component: ConcatComponent },
      { path: 'merge', component: MergeComponent },
      { path: 'startwith', component: StartwithComponent },
      { path: 'withLatestFrom', component: WithlatestfromComponent },
    ]
  },
  {
    path: 'creation', component: CreationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'from' },
      { path: 'from', component: FromComponent },
      { path: 'of', component: OfComponent },
    ]
  },
  {
    path: 'errorhandling', component: ErrorhandlingComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'catchError' },
      { path: 'catchError', component: CatcherrorComponent }
    ]
  },
  {
    path: 'filtering', component: FilteringComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'debounceTime' },
      { path: 'debounceTime', component: DebouncetimeComponent },
      { path: 'distinctUntilChanged', component: DistinctuntilchangedComponent },
      { path: 'filter', component: FilterComponent },
      { path: 'take', component: TakeComponent },
      { path: 'takeUntil', component: TakeuntilComponent }
    ]
  },
  {
    path: 'multicasting', component: MulticastingComponent,
    children:[
      {path: 'share', component:ShareComponent},
      {path: 'shareReplay', component:ShareReplayComponent},
    ]
  }
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
    StartwithComponent,
    WithlatestfromComponent,
    CreationComponent,
    FromComponent,
    OfComponent,
    ErrorhandlingComponent,
    CatcherrorComponent,
    FilteringComponent,
    DebouncetimeComponent,
    DistinctuntilchangedComponent,
    FilterComponent,
    TakeComponent,
    TakeuntilComponent,
    MulticastingComponent,
    ShareComponent,
    ShareReplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
