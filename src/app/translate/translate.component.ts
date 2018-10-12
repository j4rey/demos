import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {

  user = {
    name: 'Arthur',
    age: 42
  };
  constructor(private translateService: TranslateService) {
    this.switchLanguage('en');
  }

  switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
