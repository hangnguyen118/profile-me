import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-section',
  imports: [],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.css'
})
export class SkillsSectionComponent {
  items = [
    {
      url: "/assets/react.png",
      alt: "React Logo Image"
    },
    {
      url: "/assets/node.png",
      alt: "NodeJS Logo Image"
    },
    {
      url: "/assets/next.png",
      alt: "Next.js Logo Image"
    },
    {
      url: "/assets/angular.png",
      alt: "Angular Logo Image"
    },
    {
      url: "/assets/net.png",
      alt: ".Net Logo Image"
    },
    {
      url: "/assets/firebase.png",
      alt: "Firebase Logo Image"
    },
    {
      url: "/assets/mongodb.webp",
      alt: "MongoDb Logo Image"
    },
    {
      url: "/assets/sql.webp",
      alt: "Sql Database Logo Image"
    },
  ]
}
