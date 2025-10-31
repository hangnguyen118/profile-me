import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardAvatar } from '@angular/material/card';

@Component({
  selector: 'app-hero-section',
  imports: [MatCardAvatar, MatButtonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  title = `I\'m Hang, fullstack web developer. \nI build creative, user-friendly websites that help businesses grow.`;
  descriptions = `I Craft seamless, user-friendly websites that inspire creativity and innovation,\n transforming ideas into interactive, beautiful digital experiences.`;
}
