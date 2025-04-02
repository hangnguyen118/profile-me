import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-about-section',
  imports: [MatIcon, MatButton, MatCardImage],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {

}
