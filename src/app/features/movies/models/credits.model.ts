export interface Credit {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }
  
  export interface CreditResponse {
    cast: Credit[]; 
    crew: Credit[]; 
  }