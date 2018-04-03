import { Component, Input } from '@angular/core';

@Component({
  selector: 'psa-header-badge',
  templateUrl: './header-badge.component.html',
  styleUrls: ['./header-badge.component.scss']
})
export class HeaderBadgeComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() value: number;
}
