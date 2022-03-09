import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emailer',
  templateUrl: './emailer.component.html',
  styleUrls: ['./emailer.component.css']
})
export class EmailerComponent implements OnInit {

  public reg0FormGroup: FormGroup;

  constructor(public _fb: FormBuilder) {}

  ngOnInit(): void {
    this.reg0FormGroup = this._fb.group({
      nameCtrl: ['', Validators.required],
      phoneCtrl: ['', [Validators.required, Validators.pattern("^[0][5][0-9]{1}[-]{0,1}[0-9]{7}$")]],
      emailCtrl: ['', [Validators.required, Validators.email]],
      needsCtrl: [''],
      })
  }

}
