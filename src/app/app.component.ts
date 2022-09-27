import { Component } from '@angular/core';

import { AdvertisementFormComponent } from './advertisement-form/advertisement-form.component';
import { Advertisement } from './advertisements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchFilter: any = '';
  title = 'Advertisement';
  categorys =['Furniture','Hardware','Mobile'];
  public name ="Vijaya";
  advertisementsModel = new Advertisement('moni','','good')

constructor(){}

  Students = [{
      "id": 1,
      "name": "vijji",
      "title": "adverstiement",
      "category": "Mobile",
      "description":"hii"
    }
    
  ]

}
