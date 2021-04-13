import { Assignment } from "../assignments/assignment.model";

export class AssignmentPaginate {
    assignments: Assignment[];
    page: number=1;
    limit: number=10;
    totalDocs: number;
    totalPages: number;
    hasPrevPage: boolean;
    prevPage: number;
    hasNextPage: boolean;
    nextPage: number;
}
