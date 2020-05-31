import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TableDataService} from '../shared/table-data.service';
import {Bicscheme} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-blacklist-bic',
  templateUrl: './blacklist-bic.component.html',
  styleUrls: ['./blacklist-bic.component.css'],
  providers: [TableDataService]
})
export class BlacklistBicComponent implements OnInit {
  public data;
  public showdatabic:any = [];
  constructor(public _tableservice:TableDataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.resetbicForm();
    this.refreshbicList();
    
  }


  resetbicForm(formdata?: NgForm) {
   if (formdata)
   formdata.reset();
     this._tableservice.selectedbic = {
      ZONE_ID:"",
      BIC:"",
      BIC8:"",
      INSTITUTION_NAME:"",
      CITY:"",
      COUNTRY:"",
      WATCHLIST_NAME:"",
      UID_NO:"",
      WATCHLIST_TYPE:"",
      REF_KEY:"",
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
  submitbicform(formdata: NgForm){

    if (formdata.value.REF_KEY == "") {
  this._tableservice.bicpost(formdata.value).subscribe((res)=>{
    console.log(formdata.value);
    this.resetbicForm(formdata);
    this.refreshbicList();
    this.toastr.success('data inserted successfully', 'Blacklisted BIC');

  });
  }

  else {
  this._tableservice.bicput(formdata.value).subscribe((res) => {
    this.resetbicForm(formdata);
    this.refreshbicList();
    this.toastr.info('data update successfully', 'Blacklisted BIC');
  });

  }
}
refreshbicList(){
  this._tableservice.bicfetch()
  .subscribe(
    data => this.showdatabic = data,
    error => console.log('oops', error)
  );
}

onbicEdit(bicblack: Bicscheme) {

  this._tableservice.selectedbic = bicblack;
}

onbicDelete(REF_KEY: string, formdata: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this._tableservice.bicdelete(REF_KEY).subscribe((res) => {
      this.refreshbicList();
      this.resetbicForm(formdata);
      this.toastr.warning('Data Delete Successfully', 'Blacklisted BIC');
    });
  }
}
}


