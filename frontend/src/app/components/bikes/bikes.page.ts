import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { Bike } from 'src/app/models/bike';
import { Station } from 'src/app/models/station';
import { ServiceService } from 'src/app/services/service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.page.html',
  styleUrls: ['./bikes.page.scss'],
  providers: [ServiceService]
})
export class BikesPage implements OnInit {

  constructor(private serviceService: ServiceService, private router: Router, public toastController: ToastController) { 
    if(this.router.getCurrentNavigation().extras.queryParams!=undefined){
      this.serviceService.selectedStation = this.router.getCurrentNavigation().extras.queryParams.station;
    }
    else{
      this.router.navigate([""]);
    }
  }

  ngOnInit() {
    this.getStation();
    this.getUnassignedBikes();
  }

  getStation() {
    this.serviceService.getStation(this.serviceService.selectedStation._id)
      .subscribe(res =>{
        this.serviceService.stationBike = res["bikes"] as Bike[];
    });
  }

  addBike(bike) {
    this.serviceService.selectedBike = bike;
    this.serviceService.addBike(this.serviceService.selectedStation._id, bike)
      .subscribe(res =>{
        this.getStation();
        this.getUnassignedBikes();
        this.addedToast();
      });
  }

  deleteBike(bike) {
    this.serviceService.selectedBike = bike;
    this.serviceService.deleteBike(this.serviceService.selectedStation._id, bike)
      .subscribe(res =>{
        this.getStation();
        this.getUnassignedBikes();
        this.deletedToast();
      });
  }

  getUnassignedBikes() {
    this.serviceService.getUnassignedBikes()
      .subscribe(res =>{
        this.serviceService.unassignedBike = res as Bike[];
    })
  }

  // TOASTS
  async addedToast() {
    const toast = await this.toastController.create({
      message: 'Added Successfully',
      duration: 1500
    });
    toast.present();
  }
  async deletedToast() {
    const toast = await this.toastController.create({
      message: 'Deleted Successfully',
      duration: 1500
    });
    toast.present();
  }
  

}