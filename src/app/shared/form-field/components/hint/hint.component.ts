import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-hint',
  templateUrl: 'hint.component.html',
  styleUrls: ['./hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintComponent {}
