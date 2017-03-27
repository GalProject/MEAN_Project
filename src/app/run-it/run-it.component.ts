import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Http} from "@angular/http";
import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";

@Component({
  selector: 'app-run-it',
  templateUrl: './run-it.component.html',
  styleUrls: ['./run-it.component.css']
})
export class RunItComponent implements OnInit {

  ads = [];
  tempAds = [];
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

  user: Object = {};

  SearchForm: FormGroup;
  firstName = new FormControl("", Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
  }
  public loginForm = new FormGroup({
    email: new FormControl("email", Validators.required),
    password: new FormControl("password", Validators.required)
  });


  ngOnInit() {



    this.SearchForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

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
      numOfdaysToShow: this.numOfdaysToShow
    });
  }



  getAds() {
    this.dataService.getAds().subscribe(
      data => this.ads = this.tempAds = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  search(text) {
    this.tempAds = this.ads.filter(ad => {
      console.log(ad);
      return ad.messageName.indexOf(text) !== -1
    });

    console.log(this.tempAds);
  }

}
