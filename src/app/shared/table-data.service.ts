import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Neutralscheme,Bicscheme,Interdefination,sanctioned,internalwatchlist,Highriskcountry,Zonevsglobal} from './tabular';


@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  selectedneu:  Neutralscheme;
   selectedbic :  Bicscheme;
   selectedinterdef : Interdefination;
   selectedsanction : sanctioned;
   selectedinterwatch:internalwatchlist;   
   selectedhrc : Highriskcountry;   
   selectedzvg : Zonevsglobal;                
  constructor(private http : HttpClient) { }

// Neutral-words api call start*************************************
private _neutral_url:string = "http://localhost:3000/api/neutral_words";
private _neutral_post:string = "http://localhost:3000/api/add_neutral_words";
private _neutral_put: string= "http://localhost:3000/api/update_neutralWords";
private _neutral_delete :string = "http://localhost:3000/api/del_neutral_words";

neutrallistpage():Observable<Neutralscheme[]>
{ return  this.http.get<Neutralscheme[]>(this._neutral_url)};

neutrallistpost(neuscheme:Neutralscheme)
{ return this.http.post<any>(this._neutral_post,neuscheme)};

neutrallistput(neuscheme:Neutralscheme)
{ return this.http.put<any>(this._neutral_put + `/${neuscheme.REF_KEY}`,neuscheme)};

neutrallistdelete(REF_KEY:string)
{return this.http.delete(this._neutral_delete + `/${REF_KEY}`)};
// Neutral-words api call end*************************************





// Blacklist-bic api call start*************************************
private _bic_url:string ="http://localhost:3000/api/blacklist_bic";
private _bic_post:string = "http://localhost:3000/api/add_blacklisted_bic";
private _bic_put:string = "http://localhost:3000/api/update_blacklistedBic";
private _bic_delete:string = "http://localhost:3000/api/del_blacklisted_bic";

bicfetch():Observable<Bicscheme[]>
{ return  this.http.get<Bicscheme[]>(this._bic_url)};

bicpost(bicblack:Bicscheme)
{ return this.http.post<any>(this._bic_post,bicblack)};

bicput(bicblack:Bicscheme)
{ return this.http.put<any>(this._bic_put + `/${bicblack.REF_KEY}`,bicblack)};

bicdelete(REF_KEY:string)
{return this.http.delete(this._bic_delete + `/${REF_KEY}`)};
// Blacklist-bic api call end*************************************




// internallist-defination api call start*************************************
readonly _interdef_url:string = "http://localhost:3000/api/internal_list";
readonly _interdef_post:string = "http://localhost:3000/api/add_internal_list_def";
readonly _interdef_put: string= "http://localhost:3000/api/update_internalListDef";
readonly _interdef_delete :string = "http://localhost:3000/api/del_internal_list";

fetchinter():Observable<Interdefination[]>
{ return  this.http.get<Interdefination[]>(this._interdef_url)};

postinter(interdefs:Interdefination)
{ return this.http.post<any>(this._interdef_post,interdefs)};

putinter(interdefs:Interdefination)
{ return this.http.put<any>(this._interdef_put + `/${interdefs.REF_KEY}`,interdefs)};

deleteinter(REF_KEY:string)
{return this.http.delete(this._interdef_delete + `/${REF_KEY}`)};
// internallist-defination api call start*************************************




// Sanctioned cities api call start*************************************
readonly _sanction_url:string = "http://localhost:3000/api/sanctioned_cities";
readonly _sanction_post:string = "http://localhost:3000/api/add_sanctioned_cities";
readonly _sanction_put: string= "http://localhost:3000/api/update_sanctionedCities";
readonly _sanction_delete :string = "http://localhost:3000/api/del_sanctioned_cities";

fetchsanction():Observable<sanctioned[]>
{ return  this.http.get<sanctioned[]>(this._sanction_url)};

postsanction(sanction:sanctioned)
{ return this.http.post<any>(this._sanction_post,sanction)};

putsanction(sanction:sanctioned)
{ return this.http.put<any>(this._sanction_put + `/${sanction.REF_KEY}`,sanction)};

deletesanction(REF_KEY:string)
{return this.http.delete(this._sanction_delete + `/${REF_KEY}`)};
// Sanctioned cities api call start*************************************


// internal-watchlist api call start*************************************
readonly _interwatch_url:string = "http://localhost:3000/api/internal_watchlist";
readonly _interwatch_post:string = "http://localhost:3000/api/add_internal_watchlist";
readonly _interwatch_put: string= "http://localhost:3000/api/update_internalWatchList";
readonly _interwatch_delete :string = "http://localhost:3000/api/del_internal_watchlist";

fetchinterwatch():Observable<internalwatchlist[]>
{ return  this.http.get<internalwatchlist[]>(this._interwatch_url)};

postinterwatch(interwatch:internalwatchlist)
{ return this.http.post<any>(this._interwatch_post,interwatch)};

putinterwatch(interwatch:internalwatchlist)
{ return this.http.put<any>(this._interwatch_put + `/${interwatch.UID_SERIAL_NO}`,interwatch)};

deleteinterwatch(UID_SERIAL_NO:string)
{return this.http.delete(this._interwatch_delete + `/${UID_SERIAL_NO}`)};
// internal-watchlist api call start*************************************



// High-Risk-Cities api call start*************************************
readonly _hrc_url:string = "http://localhost:3000/api/high_risk_countries";
readonly _hrc_post:string = "http://localhost:3000/api/add_highRiskCountry";
readonly _hrc_put: string= "http://localhost:3000/api/update_highRishCountry";
readonly _hrc_delete :string = "http://localhost:3000/api/del_highRiskCountry";

fetchhrc():Observable<Highriskcountry[]>
{ return  this.http.get<Highriskcountry[]>(this._hrc_url)};

posthrc(hrc:Highriskcountry)
{ return this.http.post<any>(this._hrc_post,hrc)};

puthrc(hrc:Highriskcountry)
{ return this.http.put<any>(this._hrc_put + `/${hrc.REF_KEY}`,hrc)};

deletehrc(REF_KEY:string)
{return this.http.delete(this._hrc_delete + `/${REF_KEY}`)};
// High-Risk-Cities api call start*************************************



// Zone_vs_global api call start*************************************
readonly _zvg_url:string = "http://localhost:3000/api/zone_x_global_keywords";
readonly _zvg_post:string = "http://localhost:3000/api/add_zone_global_keywords";
readonly _zvg_put: string= "http://localhost:3000/api/update_zoneGlobalKeywords";
readonly _zvg_delete :string = "http://localhost:3000/api/del_zone_global_keywords";

fetchzvg():Observable<Zonevsglobal[]>
{ return  this.http.get<Zonevsglobal[]>(this._zvg_url)};

postzvg(zvg:Zonevsglobal)
{ return this.http.post<any>(this._zvg_post,zvg)};

putzvg(zvg:Zonevsglobal)
{ return this.http.put<any>(this._zvg_put + `/${zvg.REF_KEY}`,zvg)};

deletezvg(REF_KEY:string)
{return this.http.delete(this._zvg_delete + `/${REF_KEY}`)};
// Zone_vs_global api call start*************************************

}
