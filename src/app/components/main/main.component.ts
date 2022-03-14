import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { async, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
// import { FileValidator } from 'ngx-material-file-input';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {


	@Input()
	
	public regFormGroup: FormGroup;

	public pictaker = document.getElementById("pictaker")  as HTMLInputElement
	public filetaker = document.getElementById("filetaker") as HTMLInputElement
	// public filetaker = document.querySelector(".filetaker") 

	public name:string = ""

	public formData = new FormData();
	public regError:any = {error: false, msg:""}
	public sendingProgress:boolean = false

	requiredFileType:string;
	public fileNameCreere = '';
	public fileNamePic = '';
	uploadProgress:number;
	uploadSub: Subscription;

    constructor(public _fb: FormBuilder,
				public _ar: ActivatedRoute,
				public _d: DataService,
				public dialog: MatDialog,
				// private http: HttpClient
				) { }
  
	// public id:string
	// 71de26a0-f575-4358-82e5-09129db671e9
	public allEdu: string[] = [
		"מוצר",
		"תעשייתי",
		"אופנה",
		"תכשיטים",
		"גראפי",
		"אנימציה",
		"פנים",
		"אדריכל",
		"מעצב נוף",
		"מאייר",
		"וידאו",
		"אחר",
		"טקסטיל",
		"מוצרי ילדים",
		"קרמיקה"
	]

	public allInsti: string[] = [
		"בצלאל",
		"שנקר",
		"המכון הטכנולוגי",
		"מנשר",
		"ויצו",
		"6b",
		"אוניברסיטה אריאל",
		"אבני",
		"אוניברסיטת תל-אביב",
		"הטכניון",
		"אחר"
	]

	public log(x) {
		console.log(x)
	}

	public getStatus = async ()=>{
		try{            
			let res = await fetch(`https://api.powerlink.co.il/api/record/1/${this._d.userId}`,{
			method: "GET",
			headers:{
					"Content-Type": "application/json",
					tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
			}})
			let result = await res.json()
			console.log("get status result",result)
			this._d.userStatus = result.data.Record.pcflastedit
			this.name = result.data.Record.accountname
			console.log("all results",result, this._d.userStatus,this.name)
			}

		catch(err){
			console.log(err);
		}
	}
	
	public sendEmailAfterReg = async ()=>{

	}
	
	public startedFilling = async ()=>{
		if ( this._d.userStatus < 31 && this._d.userStatus !== 0 ) {
			try{            
				let res = await fetch(`https://api.powerlink.co.il/api/record/1/${this._d.userId}`,{
				method: "PUT",
				headers:{
						"Content-Type": "application/json",
						tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
				},
				body: JSON.stringify({
					pcflastedit:Date.now(),
					actionstatuscode:31
					})
				})
				this._d.userStatus = 31
				let result = await res.json()
				console.log(result);
				}
		catch(err){
			console.log(err);
			}
		}
		
	}

	sendFinal = async ()=> {
		this.regError = {error: false, msg:""}
		this.sendingProgress = true
		console.log(this._d.userId)
		try{            
		let res = await fetch(`reg/sendfinal/${this._d.userId}`,{
		// let res = await fetch(`https://api.powerlink.co.il/api/record/1/${this._d.userId}`,{
		method: "PUT",
		headers:{
				"Content-Type": "application/json",
				tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"
		},
		body: JSON.stringify({
				// accountname: this.regFormGroup?.controls.nameCtrl.value,
				// telephone1: this.regFormGroup?.controls.phoneCtrl.value,
				// emailaddress1: this.regFormGroup?.controls.emailCtrl.value,
				// pcfsystemfield9: this.regFormGroup?.controls.phoneCtrl.value,
				pcfsystemfield25: this.regFormGroup?.controls.instiCtrl.value,
				pcfsystemfield11: this.regFormGroup?.controls.eduCtrl.value,
				pcfsystemfield31: this.regFormGroup?.controls.cNameCtrl.value,
				pcfsystemfield27: this.regFormGroup?.controls.cDateCtrl.value,
				websiteurl: this.regFormGroup?.controls.cSiteCtrl.value,
				pcfsystemfield29: this.regFormGroup?.controls.cSocialCtrl.value,
				billingstreet: this.regFormGroup?.controls.streetCtrl.value,
				billingcity: this.regFormGroup?.controls.cityCtrl.value,
				description: this.regFormGroup?.controls.infoCtrl.value,
				// pcfsystemfield33: this.regFormGroup?.controls.programCtrl.value,
				actionstatuscode:33
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
    
	// readonly maxSize = 5242880;

	fileTooBig = (taker:HTMLInputElement) => {
		// const filetaker = document.querySelector(".filetaker") as HTMLInputElement
		// Check if any file is selected.
		if (taker.files != null && taker.files.length > 0) {
			for (let i = 0; i <= taker.files.length - 1; i++) {
				const fsize = taker.files.item(i)!.size
				// const file = Math.round((fsize / 1024));
				// The size of the file.
				// if (file >= 5242880 ) {
				if (fsize > 5242880 ) return true
				else return false
			}
		}
		return false
	}


	public filesValidator() {
		console.log(document.querySelector(".pictaker"))
		console.log(this.pictaker)
		if (!this.filetaker.files || !this.pictaker.files) {
		// if (this.formData.getAll('file').length > 2) {
			this.regError = {error: true, msg: "לא נבחרו כל הקבצים הנדרשים"}
			return false
		} 
		if (this.fileTooBig(this.pictaker) &&
		    this.fileTooBig(this.filetaker) === false) {
			this.regError = {error: true, msg: "אחד הקבצים גדול מ-5 מגהבייט"}
			return false
			}
		return true
	}


	public sendfile = async ()=>{
		console.log("file taker is",this.filetaker)
		this.formData.append("file",this.pictaker.files[0])
		this.formData.append("file",this.filetaker.files[0])
		// for(var pair of formData.entries()) {
		//     console.log(pair[0]+', '+pair[1]);
		//   }
		
		try{            
			const res = await fetch(`reg/sendfinal/${this._d.userId}/files`,{
			// const res = await fetch(`https://api.powerlink.co.il/api/v2/record/1/${this._d.userId}/files`,{
			method: "POST",
			headers:{
				tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"},
			body: this.formData
			})
			const results = await res.json()
			console.log("res are",results)
		} catch(err) {
			console.log(err)
		}        
	
	
	}
	
	isFilled = ()=>{
	  if (this.regFormGroup.controls.cityCtrl.valid &&
		  this.regFormGroup.controls.streetCtrl.valid &&
		  this.regFormGroup.controls.eduCtrl.valid &&
		  this.regFormGroup.controls.instiCtrl.valid &&
		  this.regFormGroup.controls.cNameCtrl.valid &&
		  this.regFormGroup.controls.cDateCtrl.valid &&
		  this.regFormGroup.controls.cSiteCtrl.valid &&
		  this.regFormGroup.controls.cSocialCtrl.valid &&
		  this.regFormGroup.controls.infoCtrl.valid &&
		  this.filesValidator())  return true
	  else return false
	}

    openDialog() {
	  this.dialog.open(Popup);
	  }


	onFileSelected(event,type) {
		console.log(event)
		const file:File = event.target.files[0];
		if (file) {
			if (type === "creere")	this.fileNameCreere = file.name;
			else this.fileNamePic = file.name;

			// this.formData.append("thumbnail", file);
			// const upload$ = this.http.post(`https://api.powerlink.co.il/api/v2/record/1/${this._d.userId}/files`, this.formData, {
			// 	headers: {tokenID:"df77e5c4-c80c-466f-aab5-70fe3b80e113"},
			// 	reportProgress: true,
			// 	observe: 'events'
			// })
			// .pipe(
			// 	finalize(() => this.reset())
			// );
		  
			// this.uploadSub = upload$.subscribe(event => {
			//   if (event.type == HttpEventType.UploadProgress) {
			// 	this.uploadProgress = Math.round(100 * (event.loaded / event.total));
			//   }
			// })
		}
	}
	
	// cancelUpload() {
	// this.uploadSub.unsubscribe();
	// this.reset();
	// }
	
	// reset() {
	// this.uploadProgress = null;
	// this.uploadSub = null;
	// }
	


	ngOnInit(): void {
		this._d.userId = this._ar.snapshot.paramMap.get('id')
		this.regFormGroup = this._fb.group({
			nameCtrl: [{value: this.name, disabled: true}, Validators.required],
			streetCtrl: ['', Validators.required],
			cityCtrl: ['', Validators.required],
			instiCtrl: ['', Validators.required],
			eduCtrl: ['', Validators.required],
			cNameCtrl: ['', Validators.required],
			cDateCtrl: ['', Validators.required],
			cSiteCtrl: ['', Validators.required],
			cSocialCtrl: ['', Validators.required],
			infoCtrl: [''],
			// requiredfilePic: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]],
			// requiredfile: [undefined,[Validators.required, FileValidator.maxContentSize(this.maxSize)]]
		})
		// this.regFormGroup.controls.nameCtrl.disable()
		
	}

}



///   ******POPUP********

@Component({
	selector: 'app-popup',
	templateUrl: './popup.html',
	styleUrls: ['./main.component.css']
  })

export class Popup {
	goBack = ()=>{
		window.location.href = 'http://new.designterminal.org.il';
		// this._r.navigateByUrl("new.designterminal.org.il")
		}
}

