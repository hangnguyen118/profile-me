import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardAvatar } from '@angular/material/card';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, MatCardAvatar],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
