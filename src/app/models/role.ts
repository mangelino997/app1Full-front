import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Role {

    // define el formulario
    public formulario: FormGroup;

    //constructor
    constructor(){

        this.formulario = new FormGroup({
            id: new FormControl(),
            description: new FormControl(), 
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        })
    }
}