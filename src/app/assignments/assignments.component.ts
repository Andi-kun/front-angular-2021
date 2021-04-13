import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentPaginate } from '../shared/AssignmentPaginate.model';
import { AssignmentsService } from '../shared/assignments.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})

export class AssignmentsComponent implements OnInit {
  
  // assignments:Assignment[];
  assignmentsRendu:AssignmentPaginate;
  assignmentsNonRendu:AssignmentPaginate;
  // page: number=1;
  // limit: number=10;
  // totalDocs: number;
  // totalPages: number;
  // hasPrevPage: boolean;
  // prevPage: number;
  // hasNextPage: boolean;
  // nextPage: number;

  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      // this.page = +queryParams.page || 1;
      // this.limit = +queryParams.limit || 10;
      this.assignmentsRendu = new AssignmentPaginate();
      this.assignmentsNonRendu = new AssignmentPaginate();

      this.assignmentsRendu.page = +queryParams.pageRendu || 1;
      this.assignmentsRendu.limit = +queryParams.limitRendu || 10;

      this.assignmentsNonRendu.page = +queryParams.pageNonRendu || 1;
      this.assignmentsNonRendu.limit = +queryParams.limitNonRendu || 10;

      // this.getAssignments();
      this.getAssignmentsRendu();
      this.getAssignmentsNonRendu();
    });
      console.log("getAssignments() du service appelé");
  }

  // getAssignments() {
  //   this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
  //   .subscribe(data => {
  //     this.assignments = data.docs;
  //     this.page = data.page;
  //     this.limit = data.limit;
  //     this.totalDocs = data.totalDocs;
  //     this.totalPages = data.totalPages;
  //     this.hasPrevPage = data.hasPrevPage;
  //     this.prevPage = data.prevPage;
  //     this.hasNextPage = data.hasNextPage;
  //     this.nextPage = data.nextPage;
  //     console.log("données reçues");
  //   });
  // }

  getAssignmentsRendu() {
    this.assignmentsService.getAssignmentsRenduPagine(this.assignmentsRendu.page, this.assignmentsRendu.limit)
    .subscribe(data => {
      console.log(data);
      this.assignmentsRendu.assignments = data.docs;
      this.assignmentsRendu.page = data.page;
      this.assignmentsRendu.limit = data.limit;
      this.assignmentsRendu.totalDocs = data.totalDocs;
      this.assignmentsRendu.totalPages = data.totalPages;
      this.assignmentsRendu.hasPrevPage = data.hasPrevPage;
      this.assignmentsRendu.prevPage = data.prevPage;
      this.assignmentsRendu.hasNextPage = data.hasNextPage;
      this.assignmentsRendu.nextPage = data.nextPage;
    });
  }

  getAssignmentsNonRendu() {
    this.assignmentsService.getAssignmentsNonRenduPagine(this.assignmentsNonRendu.page, this.assignmentsNonRendu.limit)
    .subscribe(data => {
      console.log(data);
      this.assignmentsNonRendu.assignments = data.docs;
      this.assignmentsNonRendu.page = data.page;
      this.assignmentsNonRendu.limit = data.limit;
      this.assignmentsNonRendu.totalDocs = data.totalDocs;
      this.assignmentsNonRendu.totalPages = data.totalPages;
      this.assignmentsNonRendu.hasPrevPage = data.hasPrevPage;
      this.assignmentsNonRendu.prevPage = data.prevPage;
      this.assignmentsNonRendu.hasNextPage = data.hasNextPage;
      this.assignmentsNonRendu.nextPage = data.nextPage;
    });
  }

  

  onDeleteAssignment(event) {
    // // event = l'assignment à supprimer
    // this.assignmentsService.deleteAssignment(event)
    //   .subscribe(message => {
    //     console.log(message);
    //   })
  }

  premierePageRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageRendu:1,
        limitRendu:assignment.limit,

      }
    });
  }
  premierePageNonRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageNonRendu:1,
        limitNonRendu:assignment.limit,
        
      }
    });
  }

  pageSuivanteRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageRendu:assignment.nextPage,
        limitRendu:assignment.limit,
      }
    });
  }
  pageSuivanteNonRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageNonRendu:assignment.nextPage,
        limitNonRendu:assignment.limit,
      }
    });
  }


  pagePrecedenteRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageRendu:assignment.prevPage,
        limitRendu:assignment.limit,
      }
    });
  }

  pagePrecedenteNonRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageNonRendu:assignment.prevPage,
        limitNonRendu:assignment.limit,
      }
    });
  }

  dernierePageRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageRendu:assignment.totalPages,
        limitRendu:assignment.limit,
      }
    });
  }

  dernierePageNonRendu(assignment) {
    this.router.navigate(['/home'], {
      queryParams: {
        pageNonRendu:assignment.totalPages,
        limitNonRendu:assignment.limit,
      }
    });
  }

  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}

