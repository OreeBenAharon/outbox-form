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

  public reg1FormGroup: FormGroup;
  public regError:any = {error: false, msg:""}
	public sendingProgress:boolean = false
  constructor(public _fb: FormBuilder,
              public _d: DataService,
			  public _r:Router,
			  public dialog: MatDialog) { }


  isFilled = ()=>{
		if (this.reg1FormGroup.controls.nameCtrl.valid &&
			this.reg1FormGroup.controls.phoneCtrl.valid &&
			this.reg1FormGroup.controls.emailCtrl.valid &&
			this.reg1FormGroup.controls.needsCtrl.valid) return true
		else return false
  }

  sendFirst = async ()=> {
		try{           
		this.regError = {error: false, msg:""}
		this.sendingProgress = true
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
					query: `(emailaddress1 = ${this.reg1FormGroup?.controls.emailCtrl.value})`,
					sort_by: "accountname",
					sort_type: "desc"
			})
		})
		let result = await res.json()
		console.log(result);
		if (result.data.Data.length > 0) {
			this.regError = {error: true, msg: "כבר קיים במערכת חשבון עם הדואר האלקטרוני שהוזן."}
			this.sendingProgress = false
			return
		}

		res = await fetch('reg/exist',{
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
					query: `(telephone1 = ${this.reg1FormGroup?.controls.phoneCtrl.value})`,
					sort_by: "accountname",
					sort_type: "desc"
			})
		})

		result = await res.json()
		console.log(result);
		if (result.data.Data.length > 0) {
			this.regError = {error: true, msg: "כבר קיים במערכת חשבון עם מספר הטלפון שהוזן."}
			this.sendingProgress = false
			return
		}

		 res = await fetch('reg/send',{
		// let res = await fetch('https://api.powerlink.co.il/api/record/1',{
			method: "POST",
			headers:{
				"content-type": "application/json",
				"Access-Control-Allow-Origin": "",
				"Access-Control-Request-Method": "",
				"Access-Control-Allow-Headers":"*",
				tokenID: process.env.token
				// tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
			},
			body: JSON.stringify({
					accountname: this.reg1FormGroup?.controls.nameCtrl.value,
					telephone1: this.reg1FormGroup?.controls.phoneCtrl.value.replace("-",""),
					emailaddress1: this.reg1FormGroup?.controls.emailCtrl.value,
					needs: this.reg1FormGroup?.controls.needsCtrl.value,
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
			},
			body: JSON.stringify({
					userId: result.data.Record.accountid,
					name: this.reg1FormGroup?.controls.nameCtrl.value,
					email: this.reg1FormGroup?.controls.emailCtrl.value,
					phone: this.reg1FormGroup?.controls.phoneCtrl.value,
					needs: this.reg1FormGroup?.controls.needsCtrl.value,
					})
			})
			// const emailResults = await res.json()
			// console.log(emailResults);
			// console.log(emailResults.success);

			if( res.status === 200 ) {
			// if( emailResults.status === 200 ) {
				this.sendingProgress = false
				this.openDialog()
			} else {
				this.sendingProgress = false
				this.regError = {error: true, msg: "בעייה בהרשמה"}

			}

	}
	catch(err){
			console.log(err);
			this.sendingProgress = false
			this.regError = {error: true, msg: "בעייה בתהליך ההרשמה"}
			}
	}

	public isValid(ctrl) {
		return ctrl.valid
	}

  public openDialog() {
		this.dialog.open(Popup);

	}



  ngOnInit(): void {
		this.reg1FormGroup = this._fb.group({
		nameCtrl: ['', Validators.required],
		phoneCtrl: ['', [Validators.required, Validators.pattern("^[0][5][0-9]{1}[-]{0,1}[0-9]{7}$")]],
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







