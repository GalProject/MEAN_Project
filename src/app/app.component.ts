import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from './services/data.service';
import { ToastComponent } from './shared/toast/toast.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})


export class AppComponent implements OnInit{

  mails = [];

  isLoading = true;
  mail = {};
  isEditing = false;

  addMailForm: FormGroup;
  messageMail = new FormControl('', Validators.required);
  emailAddressMail = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }



  ngOnInit(){
    this.getMails();

    this.addMailForm = this.formBuilder.group({
      messageMail: this.messageMail,
      emailAddressMail: this.emailAddressMail
    });
  }

  getMails() {
    this.dataService.getMails().subscribe(
      data => this.mails = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addMail() {
    this.dataService.addMail(this.addMailForm.value).subscribe(
      res => {
        console.log(res.json());
        let newMail = res.json();
        this.mails.push(newMail);
        this.addMailForm.reset();
        this.toast.setMessage('Thanks for contact GrG team', 'success');
      },
      error => console.log(error)
    );
  }



}
