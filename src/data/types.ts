export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  }


  interface UserMyNeed {
    id: number;
    username: string;
    email: string;
}

interface Community {
    id: number;
    name: string;
    location: string;
}

export interface MyNeed {
    id: number;
    description: string;
    date_posted: string;
    complete: boolean;
    user: UserMyNeed;
    community: Community;
}

