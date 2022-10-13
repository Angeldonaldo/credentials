import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.page.html',
  styleUrls: ['./listusers.page.scss'],
})
export class ListusersPage implements OnInit {

  Usuarios:any[];
  constructor(
    private userservice:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.listAllUsers();
  }
  listAllUsers(){
    this.userservice.getUsers().subscribe((res)=>{
      console.log(res);
      this.Usuarios=res;
    })
  }
  deleteUser(user,i){
    if (window.confirm('¿Realmente deseas eliminar el Registro?')) {
      console.log(user)
      this.userservice.delete(user._id)
      .subscribe(() => {
          this.Usuarios.splice(i,1);
          console.log('User deleted!')
        }
      )
    }
  }
  back(){
    this.router.navigate(['home'])
  }
}
