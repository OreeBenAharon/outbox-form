import { Component, Input, OnInit } from '@angular/core';
import { async, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
// import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {


	@Input()

	public regFormGroup: FormGroup;
	
    constructor(public _fb: FormBuilder,
				public _ar: ActivatedRoute,
				public _d: DataService) { }
  
	// public id:string

	public getStatus = async ()=>{
		try{            
			let res = await fetch(`https://api.powerlink.co.il/api/record/1/${this._d.userId}`,{
			method: "GET",
			headers:{
					"Content-Type": "application/json",
					tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
			}})
			
			let result = await res.json()
			this._d.userStatus = result.data.Record.pcflastedit
			console.log(result, this._d.userStatus);
			}

		catch(err){
			console.log(err);
		}
	}
	
	public sendEmailAfterReg = async ()=>{

	}
	
	public started = async ()=>{
		if ( this._d.userStatus < 25 && this._d.userStatus !== 0 ) {
			try{            
				let res = await fetch(`https://api.powerlink.co.il/api/record/1/${this._d.userId}`,{
				method: "PUT",
				headers:{
						"Content-Type": "application/json",
						tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
				},
				body: JSON.stringify({
					pcflastedit:Date.now(),
					actionstatuscode:24
					})
				})
				
				let result = await res.json()
				console.log(result);
				}
		catch(err){
			console.log(err);
			}
		}
		
	}

	send2 = async ()=> {
		try{            
		let res = await fetch(`https://api.powerlink.co.il/api/record/1/${this._d.userId}`,{
		method: "PUT",
		headers:{
				"Content-Type": "application/json",
				tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
		},
		body: JSON.stringify({
				// accountname: this.regFormGroup?.controls.nameCtrl.value,
				// telephone1: this.regFormGroup?.controls.phoneCtrl.value,
				// emailaddress1: this.regFormGroup?.controls.emailCtrl.value,
				pcfsystemfield9: this.regFormGroup?.controls.phoneCtrl.value,
				pcfsystemfield25: this.regFormGroup?.controls.instiCtrl.value,
				pcfsystemfield11: this.regFormGroup?.controls.eduCtrl.value,
				pcfsystemfield31: this.regFormGroup?.controls.cNameCtrl.value,
				pcfsystemfield27: this.regFormGroup?.controls.cDateCtrl.value,
				websiteurl: this.regFormGroup?.controls.cSiteCtrl.value,
				pcfsystemfield29: this.regFormGroup?.controls.cSocialCtrl.value,
				billingstreet: this.regFormGroup?.controls.streetCtrl.value,
				billingcity: this.regFormGroup?.controls.cityCtrl.value,
				description: this.regFormGroup?.controls.infoCtrl.value,
				pcfsystemfield33: this.regFormGroup?.controls.programCtrl.value,
				actionstatuscode:26
				})
		})
		
		let result = await res.json()
		console.log(result);
		
		// this._d.formData.append("file",this.regFormGroup?.controls.requiredfilePicCtrl.value.files[0])

		// res = await fetch(`https://api.powerlink.co.il/api/v2/record/1/${this._d.userId}/files`,{
		// method: "PUT",
		// headers:{
		// 	tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"},
		// body: this._d.formData
		// })
		// const results = await res.json()
		// console.log("res are",results)

	}
	catch(err){
			console.log(err);
			}
	}
  
	send = async ()=> {
		try{            
		const res = await fetch('https://api.powerlink.co.il/api/record/1',{
		method: "POST",
		headers:{
				"Content-Type": "application/json",
				tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
		},
		body: JSON.stringify({
				accountname: this.regFormGroup?.controls.nameCtrl.value,
				telephone1: this.regFormGroup?.controls.phoneCtrl.value,
				emailaddress1: this.regFormGroup?.controls.emailCtrl.value,
				actionstatuscode:22
				})
		})
		
		const result = await res.json()
		console.log(result);

	}
	catch(err){
			console.log(err);
			}
	}
  
	// readonly maxSize = 5242880;

	public sendfile = async ()=>{
		const pictaker = document.querySelector(".pictaker") as HTMLInputElement 
		const filetaker = document.querySelector(".filetaker") as HTMLInputElement 
		console.log("file taker is",filetaker.files)

		if (!filetaker.files || !pictaker.files) return

		this._d.formData.append("file",pictaker.files![0])
		this._d.formData.append("file",filetaker.files![0])
		// for(var pair of formData.entries()) {
		//     console.log(pair[0]+', '+pair[1]);
		//   }
		if ( this.fileTooBig(pictaker) || this.fileTooBig(filetaker)) return
		
		try{            
			const res = await fetch(`https://api.powerlink.co.il/api/v2/record/1/${this._d.userId}/files`,{
			method: "POST",
			headers:{
				tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"},
			body: this._d.formData
			})
			const results = await res.json()
			console.log("res are",results)
		} catch(err) {
			console.log(err)
		}        
	
	
	}
	
	fileTooBig = (taker:HTMLInputElement) => {
		// const filetaker = document.querySelector(".filetaker") as HTMLInputElement
		// Check if any file is selected.
		if (taker.files != null && taker.files.length > 0) {
			for (let i = 0; i <= taker.files.length - 1; i++) {
				const fsize = taker.files.item(i)!.size
				const file = Math.round((fsize / 1024));
				// The size of the file.
				if (file >= 5120) {
					alert(
					  "הקובץ גדול מ5 מגהבייט. נא לבחור קובץ קטן יותר")
					return true
				}
			}
		}
		return false
	}
	

	ngOnInit(): void {
		this._d.userId = this._ar.snapshot.paramMap.get('id')
		this.regFormGroup = this._fb.group({
			nameCtrl: ['', Validators.required],
			phoneCtrl: ['', Validators.required],
			emailCtrl: ['', Validators.required],
			instiCtrl: ['', Validators.required],
			eduCtrl: ['', Validators.required],
			cNameCtrl: ['', Validators.required],
			cDateCtrl: ['', Validators.required],
			cSiteCtrl: ['', Validators.required],
			cSocialCtrl: ['', Validators.required],
			streetCtrl: ['', Validators.required],
			cityCtrl: ['', Validators.required],
			infoCtrl: ['', Validators.required],
			programCtrl: ['', Validators.required],
			// requiredfilePic: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]],
			// requiredfile: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]]
		})
		
	}
    
		


}

