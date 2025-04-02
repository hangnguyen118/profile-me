import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardAvatar } from '@angular/material/card';

@Component({
  selector: 'app-hero-section',
  imports: [MatCardAvatar, MatButton],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
