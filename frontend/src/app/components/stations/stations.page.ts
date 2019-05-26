import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Station } from 'src/app/models/station';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
  providers: [ServiceService]
})

export class StationsPage implements OnInit {

  constructor(private serviceService: ServiceService, private router: Router) { }

  filteredStations;

  ngOnInit() {
    localStorage.removeItem('stationId');
    this.getStations();
  }

  getStations() {
    this.serviceService.getStations()
      .subscribe(res =>{
        this.serviceService.station = res as Station[];
        this.filteredStations = this.serviceService.station;
    })
  }

  viewStation(station) {
    this.router.navigate(["/bikes"], {queryParams: {"station": station}} );
  }

  filterInput(input){
    if (input){
      this.filteredStations = this.filteredStations.filter(station => {
        return station.name == input;
      })
    } else {
      this.getStations();
    }
  }

  refresh(){
    this.getStations();
  }

  orderStationsAlphabetically(){
    this.filteredStations.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
  }

  orderStationsAlphabeticallyReverse(){
    this.filteredStations.sort(function(a, b){
      if(a.name < b.name) { return 1; }
      if(a.name > b.name) { return -1; }
      return 0;
    })
  }

  orderStationsNumerically(){
    this.filteredStations.sort(function(a, b){
      if(a.bikes.length < b.bikes.length) { return 1; }
      if(a.bikes.length > b.bikes.length) { return -1; }
      return 0;
    })
  }

  orderStationsNumericallyReverse(){
    this.filteredStations.sort(function(a, b){
      if(a.bikes.length < b.bikes.length) { return -1; }
      if(a.bikes.length > b.bikes.length) { return 1; }
      return 0;
    })
  }



}