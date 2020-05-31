import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TableDataService} from '../shared/table-data.service';
import {sanctioned} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sanctioned-cities',
  templateUrl: './sanctioned-cities.component.html',
  styleUrls: ['./sanctioned-cities.component.css']
})
export class SanctionedCitiesComponent implements OnInit {
  public showsanction:any = [];
  constructor(public _tableservice:TableDataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetsanctionForm();
    this.refreshsanctionList();
  }
 
  resetsanctionForm(forms?: NgForm) {
    if (forms)
    forms.reset();
    this._tableservice.selectedsanction = {
      ZONE_ID: "",
      ENTRY_TYPE: "",
      SANCTIONED_CITY:"",
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
      VALID_TO_DTTM: ""
    }
  }

 
  submitform(forms: NgForm){
    console.log(forms.value);
    if (forms.value.REF_KEY == "") {
  this._tableservice.postsanction(forms.value).subscribe((res)=>{
    this.resetsanctionForm(forms);
    this.refreshsanctionList();
    this.toastr.success('data inserted successfully', 'Sanctioned Cities');

  });
}
else
{
  this._tableservice.putsanction(forms.value).subscribe((res)=>{
    this.resetsanctionForm(forms);
    this.refreshsanctionList();
    this.toastr.info('data updated successfully', 'Sanctioned Cities');
});
}
  }
  refreshsanctionList(){
    this._tableservice.fetchsanction().subscribe(
      data => this.showsanction = data,
      error => console.log('oops', error)
    );
  }
  
  onEdit(sanction: sanctioned) {
    this._tableservice.selectedsanction = sanction;
  }

  onDelete(REF_KEY: string, forms: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this._tableservice.deletesanction(REF_KEY).subscribe((res) => {
        this.refreshsanctionList();
        this.resetsanctionForm(forms);
        this.toastr.warning('Delete', 'Sanctioned Cities');
      });
    }
  }
}



