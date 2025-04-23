import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { Project } from '../../types/models/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [MatCard, MatCardContent, MatCardTitle, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  project = input.required<Project>();
  get projectCardImage(): { [key: string]: string } {
    return {
      'background-image': `url("${this.project().images[0]}")`,
    };
  }
}
