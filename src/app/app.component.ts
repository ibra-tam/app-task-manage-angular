import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app-task-manage-angular';

  constructor(private translateService: TranslateService) { 
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');
    this.translateService.getTranslation('fr').subscribe((translations: any) => {
      console.log('translation',translations);
    });
  }
}
