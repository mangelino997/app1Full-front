import { FormGroup, FormControl, Validators } from '@angular/forms';

export class User {

    // define el formulario
    public formulario: FormGroup;

    //constructor
    constructor(){

        this.formulario = new FormGroup({
            id: new FormControl(),
            email: new FormControl('', Validators.required), 
            firstName: new FormControl('', [Validators.required, Validators.minLength(2)]), 
            lastName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required), 
            confirmPassword: new FormControl('', Validators.required), 
            username: new FormControl('', Validators.required),
            roles: new FormControl(),
        })
    }
}