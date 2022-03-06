import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  public regFormGroup: FormGroup;

  constructor(public _fb: FormBuilder,
              public _d: DataService) { }

  isFilled = ()=>{
	if (this.regFormGroup.controls.nameCtrl.valid &&
		this.regFormGroup.controls.phoneCtrl.valid &&
		this.regFormGroup.controls.emailCtrl.valid &&
		this.regFormGroup.controls.needsCtrl.valid) return true
	else return false
  }

  sendFirst = async ()=> {
		try{            
		let res = await fetch('reg/send',{
		// let res = await fetch('https://api.powerlink.co.il/api/record/1',{
		method: "POST",
		headers:{
			"content-type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
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
		const result = await res.json()
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
		const emailResults = await res.json()
		console.log(emailResults);

		if( emailResults.success ) {
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

  ngOnInit(): void {
    	this.regFormGroup = this._fb.group({
        nameCtrl: ['', Validators.required],
        phoneCtrl: ['', Validators.required],
        emailCtrl: ['', Validators.required],
        needsCtrl: ['', Validators.required],
			// requiredfilePic: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]],
			// requiredfile: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]]
		})
  }

}
