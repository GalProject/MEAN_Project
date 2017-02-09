import {Component, OnInit, NgModule} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Http} from "@angular/http";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";
import {BrowserModule} from "@angular/platform-browser";
import {AgmCoreModule} from "angular2-google-maps/core";




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{


  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 31;
  lng: number = 34;


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markers: marker[] = [];


  //Added New
  ads = [];
  isLoading = true;
  isMapLoading = true;

  isEditing = false;

  addAdForm: FormGroup;
  messageName = new FormControl('', Validators.required);
  messageID = new FormControl('', Validators.required);
  messageText = new FormControl('', Validators.required);
  messagePics = new FormControl('', Validators.required);
  messageTemplatePath = new FormControl('', Validators.required);
  messageNumOfSeconds = new FormControl('', Validators.required);
  startDateWithTime = new FormControl('', Validators.required);
  endDateWithTime = new FormControl('', Validators.required);
  numOfdaysToShow = new FormControl('', Validators.required);
  messageLocation = new FormControl('', Validators.required);


  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {


    this.getAds();

    this.addAdForm = this.formBuilder.group({
      messageName: this.messageName,
      messageID: this.messageID,
      messageText: this.messageText,
      messagePics: this.messagePics,
      messageTemplatePath: this.messageTemplatePath,
      messageNumOfSeconds: this.messageNumOfSeconds,
      startDateWithTime: this.startDateWithTime,
      endDateWithTime: this.endDateWithTime,
      numOfdaysToShow: this.numOfdaysToShow,
      messageLocation: this.messageLocation

    });


  }



  setLoading():void{
    this.isLoading=false;
    this.isMapLoading=false;
  }

  setMarkers(marker, callback: () => void){

for(let ad of this.ads) {

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': ad.address}, function (results, status) {


    marker.push({
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng(),
      label: ad.messageName,
      draggable: false
    });

    callback();

  });
}

  }

  getAds() {
    this.dataService.getAds().subscribe(
      data => this.ads = data,
      error => console.log(error),
      () => {this.setMarkers(this.markers,()=>this.setLoading());

      }
    );
  }


  deleteAd(ad) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteAd(ad).subscribe(
        res => {
          let pos = this.ads.map(elem => { return elem._id; }).indexOf(ad._id);
          this.ads.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


@NgModule({
  imports: [ BrowserModule, AgmCoreModule.forRoot() ],
  declarations: [ MapComponent ],
  bootstrap: [ MapComponent ]
})
export class AppModule {}
