import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  startDate:string='';
    signUpForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.startDate = new Date().toISOString();
    console.log(this.startDate)
  }

}
