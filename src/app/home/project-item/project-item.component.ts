import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Project } from '../../types/models/project';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-project-item',
  imports: [MatIcon, MatButton],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {
  project = input.required<Project>();
  selected = output<Project>();
  onSelectedProject = () => {
    this.selected.emit(this.project());
  };
}
