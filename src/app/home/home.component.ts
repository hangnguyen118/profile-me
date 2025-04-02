import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { AboutSectionComponent } from "./about-section/about-section.component";
import { SkillsSectionComponent } from "./skills-section/skills-section.component";
import { ProjectsSectionComponent } from "./projects-section/projects-section.component";
import { ContactSectionComponent } from "./contact-section/contact-section.component";

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, MatDivider, HeroSectionComponent, AboutSectionComponent, SkillsSectionComponent, ProjectsSectionComponent, ContactSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
