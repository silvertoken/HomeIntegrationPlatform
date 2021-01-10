import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule } from '@angular/forms';
import { CertificatesComponent } from './certificates/certificates.component';
import { InfraStatusComponent } from './infra-status/infra-status.component';
import { LabStatusComponent } from './lab-status/lab-status.component';
import { SystemStatusComponent } from './system-status/system-status.component';
import { DnsComponent } from './dns/dns.component';
import { KubernetesComponent } from './kubernetes/kubernetes.component';
import { RoutingComponent } from './routing/routing.component';
import { HomeAutomationComponent } from './home-automation/home-automation.component';
import { LabServersComponent } from './lab-servers/lab-servers.component';
import { VCenterComponent } from './v-center/v-center.component';
import { VRealizeComponent } from './v-realize/v-realize.component';
import { NsxtComponent } from './nsxt/nsxt.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [OverviewComponent, RequestsComponent, CertificatesComponent, InfraStatusComponent, LabStatusComponent, SystemStatusComponent, DnsComponent, KubernetesComponent, RoutingComponent, HomeAutomationComponent, LabServersComponent, VCenterComponent, VRealizeComponent, NsxtComponent, SettingsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule
  ],
  providers: [ ]
})
export class PagesModule { }
