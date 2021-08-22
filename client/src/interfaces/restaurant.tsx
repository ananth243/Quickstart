export interface food {
   _id: string;
   image: string;
   name: string;
   sort: 0 | 1;
   cost: number;
}

export interface details {
   address: string;
   description: string;
   image: string;
}

export interface restaurant {
   rest_name: string;
   _id: string;
   details: details;
   menu: food[];
}
