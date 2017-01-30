import { Component, OnInit } from '@angular/core';

import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Shape from "d3-shape";

import { STATISTICS } from './data';
import { Stats } from './data';

@Component({
  selector: 'app-statics',
  styleUrls: ['./statics.component.css'],
  templateUrl: './statics.component.html',
  // template: `
  //   <h1>{{title}}</h1>
  //   <h2>{{title}}</h2>
  //   <svg width="960" height="500"></svg>
  // `
})
export class StaticsComponent implements OnInit {

  title = 'D3.js with Angular 2!';
  subtitle = 'Bar Chart';

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private widthPie: number;
  private heightPie: number;
  private radius: number;
  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svgPie: any;


  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor() {
    this.widthPie = 960 - this.margin.left - this.margin.right ;
    this.heightPie = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.widthPie, this.heightPie) / 2;
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();

    this.drawPie();
  }

  private initSvg() {
    this.svg = d3.select(".graph");
    this.width = 960 - this.margin.left - this.margin.right ;
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
      .value((d: any) => d.population);
    this.svgPie = d3.select(".pie")
      .append("g")
      .attr("transform", "translate(" + this.widthPie / 2 + "," + this.heightPie / 2 + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(STATISTICS.map((d) => d.letter));
    this.y.domain([0, d3Array.max(STATISTICS, (d) => d.frequency)]);
  }

  private drawAxis() {
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
  }

  private drawBars() {
    this.g.selectAll(".bar")
      .data(STATISTICS)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.x(d.letter) )
      .attr("y", (d) => this.y(d.frequency) )
      .attr("width", this.x.bandwidth())
      .attr("height", (d) => this.height - this.y(d.frequency) );
  }

  private drawPie() {
    let g = this.svgPie.selectAll(".arc")
      .data(this.pie(Stats))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path").attr("d", this.arc)
      .style("fill", (d: any) => this.color(d.data.age) );
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text((d: any) => d.data.age);
  }

}
