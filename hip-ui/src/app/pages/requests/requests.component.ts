import { Component, OnInit } from '@angular/core';
import { RestService } from '../../core/rest.service';
import { HipRequest } from '../../shared/model/HipRequest';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit {

  reqs = new Array<HipRequest>();
  req: HipRequest;
  showModal: boolean = false;
  showCancel: boolean = false;

  constructor(public rest: RestService) {  
  
  }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.rest.getRequests().subscribe(res => {
      this.reqs = res.map(item => {
        return item;
      })
    }); 
  }

  cancelRequest($event, id) {
    this.rest.cancelRequest(id).subscribe(res => {
      this.getRequests()
    })
  }

  openModal($event, req) {
    $event.preventDefault();
    this.req = req;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.req = null;
  }
  
  isPending(reqState) {
    return reqState == 'pending' ? true : this.showCancel
  }

}
