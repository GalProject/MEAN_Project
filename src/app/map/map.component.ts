import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Http} from "@angular/http";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  title: string = 'My first angular2-google-maps project';
  latitude: number = 51.678418;
  longitude: number = 10.809007;


  //Added New
  ads = [];
  isLoading = true;

  ad = {};
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

  ngOnInit(): void {

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

  getAds() {
    this.dataService.getAds().subscribe(
      data => this.ads = data,
      error => console.log(error),
      () => this.isLoading = false
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
