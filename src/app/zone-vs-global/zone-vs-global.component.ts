import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TableDataService} from '../shared/table-data.service';
import {Zonevsglobal} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-zone-vs-global',
  templateUrl: './zone-vs-global.component.html',
  styleUrls: ['./zone-vs-global.component.css']
})
export class ZoneVsGlobalComponent implements OnInit {
  public showzvg:any = [];
  constructor(public _tableservice:TableDataService, private toastr: ToastrService) { }


  ngOnInit(): void {
    
    this.resetForm();
    this.refreshList();
    
  }


  resetForm(formdata?: NgForm) {
   if (formdata)
   formdata.reset();
     this._tableservice.selectedzvg = {
      ZONE_ID: "",
      PROGRAM_KEYWORD: "",
      PROGRAM_KEYWORD_DESC: "",
      REF_KEY : "",
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
      VALID_TO_DTTM:"",
     
   
   }
  }
  submitform(formdata: NgForm){

    if (formdata.value.REF_KEY == "") {
  this._tableservice.postzvg(formdata.value).subscribe((res)=>{
    console.log(formdata.value);
    this.resetForm(formdata);
    this.refreshList();
    this.toastr.success('data inserted successfully', 'Zone Vs Global Words');

  });
  }

  else {
  this._tableservice.putzvg(formdata.value).subscribe((res) => {
    this.resetForm(formdata);
    this.refreshList();
    this.toastr.info('data update successfully', 'Zone Vs Global Words');
  });

  }
}
refreshList(){
  this._tableservice.fetchzvg()
  .subscribe(
    data => this.showzvg = data,
    error => console.log('oops', error)
  );
}

onEdit(zvg: Zonevsglobal) {

  this._tableservice.selectedzvg = zvg;
}

onDelete(REF_KEY: string, formdata: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this._tableservice.deletezvg(REF_KEY).subscribe((res) => {
      this.refreshList();
      this.resetForm(formdata);
      this.toastr.warning('Data Delete Successfully', 'Zone Vs Global Words');
    });
  }
}
}



