import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMsg: string = '';
  url: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.url = this.router.url
  }
  onSubmit(): void {
    if(this.registerForm.valid)
    {
      if(this.registerForm.value.username && this.registerForm.value.password)
        if(this.url == "/registrar"){
          this.userService.registerUser(this.registerForm.value.username, this.registerForm.value.password).subscribe({
            error: (e) => {
              this.errorMsg = e.error;
            },
            complete: () => {
              this.errorMsg = "Conta criada com sucesso!";
              this.router.navigate(["/login"]);
            }
          })
        }else if(this.url == "/login"){
          this.userService.loginUser(this.registerForm.value.username, this.registerForm.value.password).subscribe({
            error: (e) => {
              this.errorMsg = e.error;
            },
            next: (data) => {
              localStorage.setItem('token', data);
              this.errorMsg = "Logado com sucesso!";
              this.router.navigate(["carros-usados"]);
            }
          })
        }
        

    }else{
      this.errorMsg = "Insira os dados corretamente!";
    }
  }
}
