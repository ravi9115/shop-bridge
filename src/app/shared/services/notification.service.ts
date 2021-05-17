import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';

const options: Partial<IndividualConfig> = {
  closeButton: false,
  timeOut: 3000,
  enableHtml: true,
  progressBar: true,
  progressAnimation: 'increasing',
  toastClass: 'ngx-toastr',
  positionClass: 'toast-top-right',
  titleClass: 'toast-title',
  messageClass: 'toast-message',
  tapToDismiss: true,
  newestOnTop: true,
};

@Injectable()
export class NotifyService {
  options = options;

  constructor(private service: ToastrService) {}

  success(message: string, title: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.service.success(message, title, {
      ...options,
      ...override,
    });
  }

  error(message: string, title: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.service.error(message, title, {
      ...options,
      ...override,
    });
  }

  warning(message: string, title: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.service.warning(message, title, {
      ...options,
      ...override,
    });
  }
}
