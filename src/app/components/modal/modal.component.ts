import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  open() {
    this.modalService.open();
  }
  close() {
    this.modalService.close();
  }
}
