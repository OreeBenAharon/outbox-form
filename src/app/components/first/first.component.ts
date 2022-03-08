import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  public regFormGroup: FormGroup;
  public regError:any = {error: false, msg:""}
  constructor(public _fb: FormBuilder,
              public _d: DataService,
			  public _r:Router,
			  public dialog: MatDialog) { }


  isFilled = ()=>{
	if (this.regFormGroup.controls.nameCtrl.valid &&
		this.regFormGroup.controls.phoneCtrl.valid &&
		this.regFormGroup.controls.emailCtrl.valid &&
		this.regFormGroup.controls.needsCtrl.valid) return true
	else return false
  }

  sendFirst = async ()=> {
		try{           
		 
		let res = await fetch('reg/exist',{
			method: "POST",
			headers:{
				"content-type": "application/json",
				"Access-Control-Allow-Origin": "",
				"Access-Control-Request-Method": "",
				"Access-Control-Allow-Headers":"*",
				tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
			},
			body: JSON.stringify({
					objecttype: 1,
					page_size: 500,
					page_number: 1,
					fields: "accountname,emailaddress1,telephone1",
					query: `(emailaddress1 = ${this.regFormGroup?.controls.emailCtrl.value})`,
					sort_by: "accountname",
					sort_type: "desc"
			})
		})
		let result = await res.json()
		console.log(result);
		if (result.data.Data.length > 0) {
			this.regError = {error: true, msg: " כבר קיים במערכת חשבון עם הדואר האלקטרוני שהוזן."}
		}

		 res = await fetch('reg/send',{
		// let res = await fetch('https://api.powerlink.co.il/api/record/1',{
		method: "POST",
		headers:{
			"content-type": "application/json",
			"Access-Control-Allow-Origin": "",
			"Access-Control-Request-Method": "",
			"Access-Control-Allow-Headers":"*",
			tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
		},
		body: JSON.stringify({
				accountname: this.regFormGroup?.controls.nameCtrl.value,
				telephone1: this.regFormGroup?.controls.phoneCtrl.value,
				emailaddress1: this.regFormGroup?.controls.emailCtrl.value,
				needs: this.regFormGroup?.controls.needsCtrl.value,
				actionstatuscode:29,
				pcfsystemfield33:3
				})
		})
		result = await res.json()
		console.log(result);

    // result.data.Record.accountid
		res = await fetch('email',{
		method: "POST",
		headers:{
				"content-type": "application/json",
				// authorization: ""
		},
		body: JSON.stringify({
				userId: result.data.Record.accountid,
				name: this.regFormGroup?.controls.nameCtrl.value,
				email: this.regFormGroup?.controls.emailCtrl.value,
				phone: this.regFormGroup?.controls.phoneCtrl.value,
				needs: this.regFormGroup?.controls.needsCtrl.value,
				})
		})
		// const emailResults = await res.json()
		// console.log(emailResults);
		// console.log(emailResults.success);

		if( res.status === 200 ) {
		// if( emailResults.status === 200 ) {
			alert("yay! you're in!")
		} else {
			alert("oh no! registration has problems!")

		}

	}
	catch(err){
			console.log(err);
			alert("oh man! registration failed!")

			}
	}

  openDialog() {
	this.dialog.open(Popup);
	}



  ngOnInit(): void {
	this.regFormGroup = this._fb.group({
	nameCtrl: ['', Validators.required],
	phoneCtrl: ['', Validators.required],
	emailCtrl: ['', [Validators.required, Validators.email]],
	needsCtrl: [''],
		// requiredfilePic: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]],
		// requiredfile: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]]
	})
  }

}

///   ******POPUP********

// import {Component} from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.html',
	styleUrls: ['./first.component.css']
  })

export class Popup {
	goBack = ()=>{
		window.location.href = 'http://new.designterminal.org.il';
		// this._r.navigateByUrl("new.designterminal.org.il")
		}
}







