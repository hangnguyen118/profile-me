import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-logo',
  imports: [],
  templateUrl: './tech-logo.component.html',
  styleUrl: './tech-logo.component.css'
})
export class TechLogoComponent {
  url = input.required<string>();
}
