  export interface UserMyNeed {
    id: number;
    username: string;
    email: string;
  }
  
  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}

interface Type {
    id: number;
    name: string;
}

export interface Donor {
    id: number;
    user: User;
    type: Type;
}

export interface DonorNeed {
    id: number;
    need: number;
    donor: number;
    donor_type: Type;
}

interface Community {
    id: number;
    name: string;
    location: string;
}

export interface MyNeed {
    id: number;
    title: string;
    description: string;
    date_posted: string;
    complete: boolean;
    user: User;
    community: Community;
    donors: Donor[];
    donor_needs: DonorNeed[];
}
