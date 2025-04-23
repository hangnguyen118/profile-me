import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-about-section',
  imports: [MatIcon, MatButtonModule, MatCardImage],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {

}
