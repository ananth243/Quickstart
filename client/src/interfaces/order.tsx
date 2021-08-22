export interface order {
   _id: string;
   rest_name: string;
   user_id: string;
   address: string;
   items: items[];
   delivered: 0 | 1;
   total: number;
   updatedAt: string;
   createdAt: string;
}

export interface items {
   name: string;
   quantity: number;
   cost: number;
}
