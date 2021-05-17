import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: 'confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  @Input() public header = '';
  @Input() public text = '';
  @Input() public cancelButtonText = 'Cancel';
  @Input() public okButtonText = 'Ok';
  @Input() public showCancelButton = true;

  constructor(public activeModal: NgbActiveModal) {}
}
