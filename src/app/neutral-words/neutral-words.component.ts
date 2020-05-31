import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {TableDataService} from '../shared/table-data.service';
import {Neutralscheme} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-neutral-words',
  templateUrl: './neutral-words.component.html',
  styleUrls: ['./neutral-words.component.css'],
  providers: [TableDataService]
})
export class NeutralWordsComponent implements OnInit {

  public data;
  public showdata:any = [];
  constructor(public _tableservice:TableDataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.resetForm();
    this.refreshEmployeeList();
  
  }

  addform = () =>{

    $("#addForm").toggle();
  }


 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectedneu = {
      ZONE_ID: "",
      NOISE_WORD: "",
      REF_KEY: "",
      MAKER_USER_ID: "",
      CHECKER_USER_ID: "",
      MAKER_USER_NM: "",
      CHECKER_USER_NM: "",
      MAKER_COMMENT: "",
      CHECKER_COMMENT: "",
      MAKER_DTTM: "",
      CHECKER_DTTM: "",
      MAKER_DATE: "",
      CHECKER_DATE: "",
      CHANGE_TYPE: "",
      UPDATE_VERSION: "",
      VALIDATION_STATUS: "",
      VALID_FROM_DTTM: "",
      VALID_TO_DTTM:""
   }
  }
  submitform(form: NgForm){

    if (form.value.REF_KEY == "") {
  this._tableservice.neutrallistpost(form.value).subscribe((res)=>{
    this.resetForm(form);
    this.refreshEmployeeList();
    this.toastr.success('data inserted successfully', 'Neutral Words');

  });
  }

  else {
  this._tableservice.neutrallistput(form.value).subscribe((res) => {
    this.resetForm(form);
    this.refreshEmployeeList();
    this.toastr.info('data update successfully', 'Neutral Words');
  });

  }
}
refreshEmployeeList(){
  this._tableservice.neutrallistpage()
  .subscribe(
    data => this.showdata = data,
    error => console.log('oops', error)
  );
}

onEdit(neuscheme: Neutralscheme) {

  this._tableservice.selectedneu = neuscheme;
}

onDelete(REF_KEY: string, form: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this._tableservice.neutrallistdelete(REF_KEY).subscribe((res) => {
      this.refreshEmployeeList();
      this.resetForm(form);
      this.toastr.warning('Data Delete Successfully', 'Neutral Words');
    });
  }
}
}
