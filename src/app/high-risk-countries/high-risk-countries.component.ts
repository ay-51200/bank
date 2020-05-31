import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TableDataService} from '../shared/table-data.service';
import {Highriskcountry} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-high-risk-countries',
  templateUrl: './high-risk-countries.component.html',
  styleUrls: ['./high-risk-countries.component.css'],
  providers: [TableDataService]
})
export class HighRiskCountriesComponent implements OnInit {
  public showhrc:any = [];
  constructor(public _tableservice:TableDataService, private toastr: ToastrService) { }


  ngOnInit(): void {
    
    this.resetForm();
    this.refreshList();
    
  }


  resetForm(formdata?: NgForm) {
   if (formdata)
   formdata.reset();
     this._tableservice.selectedhrc = {
      ZONE_ID: "",
      COUNTRY_CODE: "",
      COUNTRY_NAME: "",
      RISK_LEVEL: "",
      SANCTIONED_FLAG:"",
      REF_KEY: "",
      MAKER_USER_ID:"",
      CHECKER_USER_ID:"",
      MAKER_USER_NM:"",
      CHECKER_USER_NM:"",
      MAKER_COMMENT:"",
      CHECKER_COMMENT:"",
      MAKER_DTTM:"",
      CHECKER_DTTM:"",
      MAKER_DATE:"",
      CHECKER_DATE:"",
      CHANGE_TYPE:"",
      UPDATE_VERSION:"",
      VALIDATION_STATUS:"",
      VALID_FROM_DTTM:"",
      VALID_TO_DTTM:""
   
   }
  }
  submitform(formdata: NgForm){

    if (formdata.value.REF_KEY == "") {
  this._tableservice.posthrc(formdata.value).subscribe((res)=>{
    console.log(formdata.value);
    this.resetForm(formdata);
    this.refreshList();
    this.toastr.success('data inserted successfully', 'High Risk Countries');

  });
  }

  else {
  this._tableservice.puthrc(formdata.value).subscribe((res) => {
    this.resetForm(formdata);
    this.refreshList();
    this.toastr.info('data update successfully', 'High Risk Countries');
  });

  }
}
refreshList(){
  this._tableservice.fetchhrc()
  .subscribe(
    data => this.showhrc = data,
    error => console.log('oops', error)
  );
}

onEdit(hrc: Highriskcountry) {

  this._tableservice.selectedhrc = hrc;
}

onDelete(REF_KEY: string, formdata: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this._tableservice.deletehrc(REF_KEY).subscribe((res) => {
      this.refreshList();
      this.resetForm(formdata);
      this.toastr.warning('Data Delete Successfully', 'High Risk Countries');
    });
  }
}
}



