var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from './services/data.service';
import { ToastComponent } from './shared/toast/toast.component';
export var AppComponent = (function () {
    function AppComponent(http, dataService, toast, formBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.toast = toast;
        this.formBuilder = formBuilder;
        this.mails = [];
        this.isLoading = true;
        this.mail = {};
        this.isEditing = false;
        this.messageMail = new FormControl('', Validators.required);
        this.emailAddressMail = new FormControl('', Validators.required);
    }
    AppComponent.prototype.ngOnInit = function () {
        //this.getMails();
        this.addMailForm = this.formBuilder.group({
            messageMail: this.messageMail,
            emailAddressMail: this.emailAddressMail
        });
    };
    //
    // getMails() {
    //   this.dataService.getMails().subscribe(
    //     data => this.mails = data,
    //     error => console.log(error),
    //     () => this.isLoading = false
    //   );
    // }
    AppComponent.prototype.addMail = function () {
        var _this = this;
        this.dataService.addMail(this.addMailForm.value).subscribe(function (res) {
            console.log(res.json());
            var newMail = res.json();
            _this.mails.push(newMail);
            _this.addMailForm.reset();
            _this.toast.setMessage('Thanks for contact GrG team', 'success');
        }, function (error) { return console.log(error); });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }), 
        __metadata('design:paramtypes', [Http, DataService, ToastComponent, FormBuilder])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/GalBenEvgi/WebstormProjects/Mean_Project/src/app/app.component.js.map