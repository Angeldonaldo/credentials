import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) { }
  singup() {
    this.router.navigate(['singup'])
    console.log("cambio de ventana");
  }
}
