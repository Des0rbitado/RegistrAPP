import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'app-qr-scanner-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Escanear Código QR</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Cancelar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <video #video style="width: 100%; height: auto;"></video>
    </ion-content>
  `,
  styles: []
})
export class QrScannerModalComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElem!: ElementRef<HTMLVideoElement>;
  qrScanner!: QrScanner;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.qrScanner = new QrScanner(
      this.videoElem.nativeElement,
      (result) => this.onScanSuccess(result.data),
      { preferredCamera: 'environment' }
    );
    this.qrScanner.start();
  }

  onScanSuccess(result: string) {
    this.close(result);
  }

  close(result?: string) {
    this.qrScanner.stop();
    this.modalController.dismiss(result);
  }
}
