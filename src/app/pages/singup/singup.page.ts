import { Component, OnInit,NgZone  } from '@angular/core';
import { FormGroup,FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  startDate:string='';
  
  userForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private userservice:UserService
    ) { 
      this.userForm=this.formBuilder.group({
        name:[''],
        lastname:[''],
        email:[''],
        phone:[''],
        puesto:[''],
        image:[''],
        password:[''],
        birtdate:['']
      })

    }

  ngOnInit() {
    this.startDate = new Date().toISOString();
    console.log(this.startDate)
  }
  onSubmit(){
    if(!this.userForm.valid){
      return false;
    }else{
      this.userservice.createUser(this.userForm.value).subscribe((response)=>{
        this.zone.run(()=>{
          this.userForm.reset();
          this.router.navigate(['/listusers']);
        })
      })
    }
  }

}
