import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardAvatar } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-contact-section',
  imports: [MatCard, MatFormField, MatLabel, MatButton, MatInput, MatCardAvatar],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent {

}
