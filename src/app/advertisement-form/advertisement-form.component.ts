import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,MinLengthValidator,Validator, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AdverstimentData } from './adverstiment.model'

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.css']
})
export class AdvertisementFormComponent implements OnInit {
  
  formValue!: FormGroup
  adverstimentModelObj: AdverstimentData = new AdverstimentData
  allAdverstimentData: any;
  showAdd!: boolean;
  showbtn!: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      name: ['',Validators.required,Validators.minLength(3)],
      title:[''],
      category: [''],
      description: ['']
      

    })
    this.getAllAdvertises()

  }
  clickAddAdvertise() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }
  addAdvertise() {
    this.adverstimentModelObj.name = this.formValue.value.name;
    this.adverstimentModelObj.title = this.formValue.value.title;
    this.adverstimentModelObj.category = this.formValue.value.category;
    this.adverstimentModelObj.description = this.formValue.value.description;
  


    this.api.postAdvertisement(this.adverstimentModelObj).subscribe(res => {
      console.log(res);
      alert("Advertisement Records Added Successfull ");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllAdvertises();
    },
      err => {
        alert("something wrong")
      }
    )

  }
  getAllAdvertises() {
    this.api.getAdvertisement().subscribe(res => {
      this.allAdverstimentData = res;
    })
  }
  deleteAdvertise(data: any) {
    this.api.deleteAdverstiment(data.id).subscribe(res => {
      alert("Restaurant Records Deleted")
      this.getAllAdvertises();
    })
  }
  onEditAdvertise(data: any) {
    this.showAdd = true;
    this.showbtn = false;
  
    this.formValue.controls['name '].setValue(data.name);
    this.formValue.controls['title '].setValue(data.title);
    this.formValue.controls['category'].setValue(data.category);
    this.formValue.controls['description'].setValue(data.description);
  
  }
  updateAdvertise() {
    this.adverstimentModelObj.name = this.formValue.value.name;
    this.adverstimentModelObj.title=this.formValue.value.title;
    this.adverstimentModelObj.category = this.formValue.value.category;
    this.adverstimentModelObj.description = this.formValue.value.description;
  

    this.api.updateAdverstiment(this.adverstimentModelObj, this.adverstimentModelObj.id).subscribe(res => {
      alert("Advertisement Records updated");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllAdvertises();
    })

  }

}



