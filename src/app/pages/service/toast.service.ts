import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class toastService {

    constructor(private messageService: MessageService) {
    }

    showToast(severity: string, summary: string, message: string) {
        this.messageService.add({
            severity: severity,
            summary: summary,
            detail: message,
            life: 3000
        });
    }
}