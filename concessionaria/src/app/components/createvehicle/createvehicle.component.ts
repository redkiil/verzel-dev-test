import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle } from '../../models/Vehicle'

@Component({
  selector: 'app-createvehicle',
  templateUrl: './createvehicle.component.html',
  styleUrls: ['./createvehicle.component.css']
})
export class CreatevehicleComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private vehicleService: VehiclesService) { }

  errorMsg?: string;
  id?: any;

  createVehicleForm = this.formBuilder.group({
    model: ['', Validators.required],
    brand: ['', Validators.required],
    doors: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    year: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    hodometer: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    color: ['', Validators.required],
    location: ['', Validators.required],
    photo: [''],
    photoFile: ['']
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.vehicleService.getVehicle(this.id).subscribe({
        error: (e) => {
          console.error(e);
        },
        next: (data) => {
          Object.keys(data).forEach((key)=>{
            let ok = data[key as keyof Vehicle];
            if(key != "photo")
              this.createVehicleForm.get(key)?.patchValue(ok);
          });
        }
      })
    }
  }
  onFileChange(event: any) : void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createVehicleForm.patchValue({
        photoFile: file
      });
    }
  }
  onSubmit(): void {
    if(this.createVehicleForm.valid)
    {
        if(this.id)
        {
          this.vehicleService.updateVehicle(this.createVehicleForm, this.id).subscribe({
            error: (e) => {
              this.errorMsg = e.statusText;
            },
            complete: () => {
              this.errorMsg = "Veiculo editado com sucesso!";
            }
          })
        }else{
          this.vehicleService.uploadVehicle(this.createVehicleForm).subscribe({
            error: (e) => {
              this.errorMsg = e.statusText;
            },
            complete: () => {
              this.errorMsg = "Veiculo criado com sucesso!";
            }
          })
        }
    }else{
      this.errorMsg = "O Formulário contem algum erro";
    }
  }
  deleteVehicle():void{
    if(this.id){
      this.vehicleService.deleteVehicle(this.id).subscribe({
        error: (e) => {
          this.errorMsg = e.statusText;
        },complete: () => {
          this.errorMsg = "Veiculo deletado com sucesso!";
        }
      });
    }
  }
}
