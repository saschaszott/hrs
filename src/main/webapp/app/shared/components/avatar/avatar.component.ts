import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() heading = '';
  @Input() subheading = '';
  @Input() imgSrc = '';
}
