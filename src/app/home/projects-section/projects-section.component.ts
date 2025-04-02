import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-projects-section',
  imports: [MatCardModule, MatIcon, MatButton, MatChipSet],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {

}
