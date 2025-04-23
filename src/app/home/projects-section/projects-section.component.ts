import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProjectItemComponent } from "../project-item/project-item.component";
import { projects } from '../../types/mocks';
import { Project } from '../../types/models/project';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-projects-section',
  imports: [MatCardModule, ProjectItemComponent, ProjectCardComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css',
})
export class ProjectsSectionComponent {
  projects = projects;
  selectedProject = signal(this.projects[0]);
  images = computed<string[]>(() => this.selectedProject().images ?? [] );
  getImagePath(image: string): string {
    return `${image}`;
  }
  onSelectedProject(project: Project) {
    this.selectedProject.set(project);
  }
  selectedIndex = 0;
  onTabChange(index: number) {
    this.selectedIndex = index;
  }
}
