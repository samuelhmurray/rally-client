export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  }
  
  export interface UserMyNeed {
    id: number;
    username: string;
    email: string;
  }
  
  interface Community {
    id: number;
    name: string;
    location: string;
  }
  
  interface Donor {
    user: User;
    type: {
      id: number;
      name: string;
    };
  }
  
  export interface MyNeed {
    id: number;
    title: string;
    description: string;
    date_posted: string;
    complete: boolean;
    user: UserMyNeed;
    community: Community;
    donors: Donor[];
  }
  