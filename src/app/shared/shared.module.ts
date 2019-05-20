import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Pipes Modulo
import { PipesModule } from '../pipes/pipes.module';

// ng- bootstrap (rating)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ng- Select
import { NgSelectModule } from '@ng-select/ng-select';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebardComponent } from './sidebard/sidebard.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        NgSelectModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebardComponent,
        BreadcrumbsComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebardComponent,
        BreadcrumbsComponent
    ]
})

export class SharedModule { }
