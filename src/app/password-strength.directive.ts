import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appPasswordStrength]',
})
export class PasswordStrengthDirective {
  @Output() Validate: EventEmitter<boolean> = new EventEmitter();
  @Input() minLength = 6;
  @Input() mustContainUpperCaseLetters = true;
  @Input() mustContainLowerCaseLetters = true;
  @Input() mustContainNumbers = true;
  @Input() mustContainSpecialCharacters = true;
  passwordRegEx = '';
  isStrong: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class') elementClass;

  @HostListener('input', ['$event'])
  onChange() {
    this.passwordRegEx = '^';
    this.renderer.removeClass(this.el.nativeElement, 'error');

    this.passwordRegEx = this.passwordRegEx + `(?=.{${this.minLength},})`;
    if (this.mustContainLowerCaseLetters) {
      this.passwordRegEx = this.passwordRegEx + '(?=.*[a-z])';
    }
    if (this.mustContainUpperCaseLetters) {
      this.passwordRegEx = this.passwordRegEx + '(?=.*[A-Z])';
    }
    if (this.mustContainNumbers) {
      this.passwordRegEx = this.passwordRegEx + '(?=.*[0-9])';
    }
    if (this.mustContainSpecialCharacters) {
      this.passwordRegEx = this.passwordRegEx + '(?=.*[!@#$%^&*])';
    }

    var input: HTMLInputElement = this.el.nativeElement.getElementsByTagName(
      'input'
    )[0];

    var myRegEx = new RegExp(this.passwordRegEx);

    if (!myRegEx.test(input.value)) {
      this.renderer.addClass(this.el.nativeElement, 'error');
      this.isStrong = false;
    } else {
      this.isStrong = true;
    }

    this.Validate.emit(this.isStrong);
  }
}
