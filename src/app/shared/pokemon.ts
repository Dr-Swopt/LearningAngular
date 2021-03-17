import { stringify } from "@angular/compiler/src/util";

/* export class Pokemon {
    constructor(
        public id? : number,
       public name? : string,
       public src? : string,
       public description?: string
    ){
    }
} */

export interface Pokemon {
  id: number;
  name?: string;
  src?: string;
  description?: string;
}
