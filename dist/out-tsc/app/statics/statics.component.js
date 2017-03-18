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
import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Shape from "d3-shape";
import { STATISTICS } from './data';
import { Http } from "@angular/http";
import { DataService } from "../services/data.service";
import { ToastComponent } from "../shared/toast/toast.component";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
export var StaticsComponent = (function () {
    function StaticsComponent(http, dataService, toast, formBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.toast = toast;
        this.formBuilder = formBuilder;
        this.ads = [];
        this.isLoading = true;
        this.flag = true;
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
        this.title = 'Our Graph';
        this.subtitle = 'Bar Chart';
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.dataToGraphA = [];
        this.dataToGraphB = [];
        this.widthPie = 960 - this.margin.left - this.margin.right;
        this.heightPie = 500 - this.margin.top - this.margin.bottom;
        this.radius = Math.min(this.widthPie, this.heightPie) / 2;
    }
    StaticsComponent.prototype.setDataToGraphs = function () {
        console.log(this.ads);
        var i = 0;
        if (this.flag == true) {
            for (i; i < this.ads.length; i++) {
                this.dataToGraphA.push({ letter: this.ads[i].messageTemplatePath.toString(), frequency: 0.0441 });
                this.dataToGraphB.push({ age: this.ads[i].messageTemplatePath.toString(), population: this.ads[i].messageID.toString() });
            }
            console.log(this.dataToGraphA);
            console.log(STATISTICS);
        }
        this.flag = false;
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
        this.drawPie();
    };
    StaticsComponent.prototype.ngOnInit = function () {
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
    StaticsComponent.prototype.getAds = function () {
        var _this = this;
        this.dataService.getAds().subscribe(function (data) { return _this.ads = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    StaticsComponent.prototype.initAxis = function () {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.dataToGraphA.map(function (d) { return d.letter; }));
        this.y.domain([0, d3Array.max(STATISTICS, function (d) { return d.frequency; })]);
    };
    StaticsComponent.prototype.drawAxis = function () {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x));
        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3Axis.axisLeft(this.y).ticks(10, "%"))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");
    };
    StaticsComponent.prototype.drawBars = function () {
        var _this = this;
        this.g.selectAll(".bar")
            .data(this.dataToGraphA)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return _this.x(d.letter); })
            .attr("y", function (d) { return _this.y(d.frequency); })
            .attr("width", this.x.bandwidth())
            .attr("height", function (d) { return _this.height - _this.y(d.frequency); });
    };
    StaticsComponent.prototype.initSvg = function () {
        this.svg = d3.select(".graph");
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.color = d3Scale.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        this.arc = d3Shape.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(0);
        this.labelArc = d3Shape.arc()
            .outerRadius(this.radius - 40)
            .innerRadius(this.radius - 40);
        this.pie = d3Shape.pie()
            .sort(null)
            .value(function (d) { return d.population; });
        this.svgPie = d3.select(".pie")
            .append("g")
            .attr("transform", "translate(" + this.widthPie / 2 + "," + this.heightPie / 2 + ")");
    };
    StaticsComponent.prototype.drawPie = function () {
        var _this = this;
        var g = this.svgPie.selectAll(".arc")
            .data(this.pie(this.dataToGraphB))
            .enter().append("g")
            .attr("class", "arc");
        g.append("path").attr("d", this.arc)
            .style("fill", function (d) { return _this.color(d.data.age); });
        g.append("text").attr("transform", function (d) { return "translate(" + _this.labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function (d) { return d.data.age; });
    };
    StaticsComponent = __decorate([
        Component({
            selector: 'app-statics',
            styleUrls: ['./statics.component.css'],
            templateUrl: './statics.component.html',
            providers: [DataService]
        }), 
        __metadata('design:paramtypes', [Http, DataService, ToastComponent, FormBuilder])
    ], StaticsComponent);
    return StaticsComponent;
}());
//# sourceMappingURL=C:/Users/GalBenEvgi/WebstormProjects/Mean_Project/src/app/statics/statics.component.js.map