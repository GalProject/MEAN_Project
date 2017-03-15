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
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { Http } from "@angular/http";
import { DataService } from "../services/data.service";
import { ToastComponent } from "../shared/toast/toast.component";
export var RunItComponent = (function () {
    function RunItComponent(http, dataService, toast, formBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.toast = toast;
        this.formBuilder = formBuilder;
        this.ads = [];
        this.isLoading = true;
        this.ad = {};
        this.isEditing = false;
        this.messageName = new FormControl('', Validators.required);
        this.messageID = new FormControl('', Validators.required);
        this.messageText = new FormControl('', Validators.required);
        this.messagePics = new FormControl('', Validators.required);
        this.messageTemplatePath = new FormControl('', Validators.required);
        this.messageNumOfSeconds = new FormControl('', Validators.required);
        this.startDateWithTime = new FormControl('', Validators.required);
        this.endDateWithTime = new FormControl('', Validators.required);
        this.numOfdaysToShow = new FormControl('', Validators.required);
    }
    RunItComponent.prototype.setBorderColor = function (ad) {
        if (ad.messageTemplatePath.toString() == "A") {
            return {
                borderColor: 'green'
            };
        }
        if (ad.messageTemplatePath.toString() == "B") {
            return {
                borderColor: 'red'
            };
        }
        if (ad.messageTemplatePath.toString() == "C") {
            return {
                borderColor: 'gold'
            };
        }
    };
    RunItComponent.prototype.ngOnInit = function () {
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
    };
    RunItComponent.prototype.getAds = function () {
        var _this = this;
        this.dataService.getAds().subscribe(function (data) { return _this.ads = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    RunItComponent = __decorate([
        Component({
            selector: 'app-run-it',
            templateUrl: './run-it.component.html',
            styleUrls: ['./run-it.component.css']
        }), 
        __metadata('design:paramtypes', [Http, DataService, ToastComponent, FormBuilder])
    ], RunItComponent);
    return RunItComponent;
}());
//# sourceMappingURL=C:/Users/GalBenEvgi/WebstormProjects/Mean_Project/src/app/run-it/run-it.component.js.map