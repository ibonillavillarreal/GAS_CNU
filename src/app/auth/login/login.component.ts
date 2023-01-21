import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';


@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {   
  
    login: FormGroup 
    tools:GlobalUtilities

  constructor(private _builder:FormBuilder,private src:LoginService) {
    this.tools = GlobalUtilities.getInstance();
    this.login = this._builder.group({
      user:['',Validators.required],
      psw:['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

  enviar(values:any){
    let cls = new User(values.user, values.psw);    
      

     console.log(cls); 
   
     /*  consulta el tkn 
    
     this.src.getLogin(cls).subscribe(res => {
      console.log("LLEGA"+res)
      //const tkn_auth= localStorage.getItem('token');
      // console.log(' TKN-AUTH '+ res.token);
      if(res.auth){
        localStorage.setItem('token',res.token);    
        this.tools.setAuthenticated(true);
        location.reload()
      }else{
        this.tools.setAuthenticated(true);
        localStorage.removeItem('token')  
      }
    });

      */

       this.tools.setAuthenticated(true);    
      //this,this.tools.setIsLoading(true);
      //location.reload()

  }
  
}
