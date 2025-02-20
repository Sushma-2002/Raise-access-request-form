import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessRequestService {
  private storageKey = 'requests';

  requests = {
    pending: [] as any[],
    approved: [] as any[],
    rejected: [] as any[],
  };

  constructor() {
    this.loadData();
  }

  // Load data from localStorage
  private loadData() {
    const storedRequests = localStorage.getItem(this.storageKey);
    if (storedRequests) {
      try {
        this.requests = JSON.parse(storedRequests);
      } catch (error) {
        console.error('Error parsing stored requests:', error);
        this.resetRequests();
      }
    }
    console.log('Loaded Requests:', this.requests);
  }

  // Save data to localStorage
  private saveData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.requests));
    console.log('Saved Requests:', this.requests);
  }

  // Reset request structure in case of an error
  private resetRequests() {
    this.requests = { pending: [], approved: [], rejected: [] };
  }

  // Generate a unique ID
  private generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }

  // Add a new request
  addRequest(request: any) {
    const newRequest = { ...request, id: this.generateId(), highlightedRoles: [] };
    this.requests.pending.push(newRequest);
    this.saveData();
  }

  // Approve request and move to 'approved' list
  approveRequest(requestId: string) {
    const request = this.requests.pending.find((r) => r.id === requestId);
    if (request) {
      this.requests.pending = this.requests.pending.filter((r) => r.id !== requestId);
      this.requests.approved.push(request);
      this.saveData();
    }
  }

  // Reject request and move to 'rejected' list
  rejectRequest(requestId: string) {
    const request = this.requests.pending.find((r) => r.id === requestId);
    if (request) {
      this.requests.pending = this.requests.pending.filter((r) => r.id !== requestId);
      this.requests.rejected.push(request);
      this.saveData();
    }
  }

  // Delete a request from the 'approved' list
  deleteRequest(requestId: string) {
    this.requests.approved = this.requests.approved.filter((r) => r.id !== requestId);
    this.saveData();
  }

  // Update access type of an approved request
  updateAccessType(requestId: string, newAccessType: string) {
    const request = this.requests.approved.find((r) => r.id === requestId);
    if (request) {
      request.accessType = newAccessType;
      this.saveData();
    }
  }

  // Get all requests
  getRequests() {
    return this.requests;
  }
}
