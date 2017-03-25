import { Component } from '@angular/core';
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(
              private dataService: DataService,
              public toast: ToastComponent,) {


  }

}
