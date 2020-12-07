import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { OverviewComponent } from './pages/overview/overview.component'
import { RequestsComponent } from './pages/requests/requests.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { InfraStatusComponent } from './pages/infra-status/infra-status.component';
import { LabStatusComponent } from './pages/lab-status/lab-status.component';
import { SystemStatusComponent } from './pages/system-status/system-status.component';
import { DnsComponent } from './pages/dns/dns.component';
import { KubernetesComponent } from './pages/kubernetes/kubernetes.component';
import { RoutingComponent } from './pages/routing/routing.component';
import { HomeAutomationComponent } from './pages/home-automation/home-automation.component';
import { LabServersComponent } from './pages/lab-servers/lab-servers.component';
import { VCenterComponent } from './pages/v-center/v-center.component';
import { VRealizeComponent } from './pages/v-realize/v-realize.component';
import { NsxtComponent } from './pages/nsxt/nsxt.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/overview',  pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'infra-status', component: InfraStatusComponent },
      { path: 'lab-status', component: LabStatusComponent },
      { path: 'system-status', component: SystemStatusComponent },
      { path: 'dns', component: DnsComponent },
      { path: 'kubernetes', component: KubernetesComponent },
      { path: 'home-automation', component: HomeAutomationComponent },
      { path: 'lab-servers', component: LabServersComponent },
      { path: 'routing', component: RoutingComponent },
      { path: 'vcenter', component: VCenterComponent },
      { path: 'vrealize', component: VRealizeComponent },
      { path: 'nsxt', component: NsxtComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
