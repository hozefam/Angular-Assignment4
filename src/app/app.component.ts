import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  enteredPassword: '';
  isPasswordValid: boolean = null;

  mustContainUpperCaseLetters = true;
  mustContainLowerCaseLetters = true;
  mustContainNumbers = true;
  mustContainSpecialCharacters = true;

  onValidate(value) {
    this.isPasswordValid = value;
  }
}
