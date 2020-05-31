import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TableDataService} from '../../shared/table-data.service';
import {Interdefination} from '../../shared/tabular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-internallist-defination',
  templateUrl: './internallist-defination.component.html',
  styleUrls: ['./internallist-defination.component.css'],
  providers: [TableDataService]
})
export class InternallistDefinationComponent implements OnInit {
  public data;
   public showinternallist:any = [];
   constructor(public _tableservice:TableDataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetinternaldefForm();
    this.refreshinterdefList();
  }
 
  resetinternaldefForm(forms?: NgForm) {
    if (forms)
    forms.reset();
    this._tableservice.selectedinterdef = {
      ZONE_ID: "",
      LIST_TYPE: "",
      LIST_CATEGORY: "",
      WATCHLIST_NAME: "",
      WATCHLIST_ID: "",
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
      VALID_TO_DTTM: "",
      DELETE_FLG: "",
    }
  }

 
  submitInternal(forms: NgForm){
    console.log(forms.value);
    if (forms.value.REF_KEY == "") {
  this._tableservice.postinter(forms.value).subscribe((res)=>{
    this.resetinternaldefForm(forms);
    this.refreshinterdefList();
    this.toastr.success('data inserted successfully', 'Internal-defination');

  });
}
else
{
  this._tableservice.putinter(forms.value).subscribe((res)=>{
    this.resetinternaldefForm(forms);
    this.refreshinterdefList();
    this.toastr.info('data updated successfully', 'Internal-defination');
});
}
  }
  refreshinterdefList(){
    this._tableservice.fetchinter().subscribe(
      data => this.showinternallist = data,
      error => console.log('oops', error)
    );
  }
  
  oninterEdit(interdef: Interdefination) {
    this._tableservice.selectedinterdef = interdef;
  }

  oninterDelete(REF_KEY: string, forms: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this._tableservice.deleteinter(REF_KEY).subscribe((res) => {
        this.refreshinterdefList();
        this.resetinternaldefForm(forms);
        this.toastr.warning('Delete', 'Internal-defination');
      });
    }
  }
}
