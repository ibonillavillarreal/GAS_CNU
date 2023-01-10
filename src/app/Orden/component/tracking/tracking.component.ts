import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { UpdateOrdenTracking } from 'src/app/models/UpdateOrdenTracking';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
    list_tracking: any;
    isShown: boolean = false;
    constructor(private srcOrden:OrdenService, @Inject(MAT_DIALOG_DATA) public data: any) { 
        console.log(this.data);
        this.getData();
    }

    ngOnInit(): void {
        
    }

    async getData(){
        let data = await this.srcOrden.ordenTracking(this.data.id_orden).toPromise();
        this.list_tracking = data[0];
        console.log(this.list_tracking);
        this.isShown = true
    }

    changeEstacion(){
        let orden = new UpdateOrdenTracking(this.data.id_orden, 5);
        this.srcOrden.ordenTrackingUpdate(orden).subscribe(res => {
            this.getData();
        });
    }
}
