import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SkillChartComponent } from "../../../shared/skill-chart/skill-chart.component";

@Component({
  selector: 'app-about-section',
  imports: [MatIcon, MatButtonModule, SkillChartComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {

}
