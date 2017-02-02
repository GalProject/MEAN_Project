import { Component} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 10.809007;


}
