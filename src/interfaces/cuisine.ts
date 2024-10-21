import { IRecipe } from "./recipe";

export interface ICuisine {
  _id: string;
  name: string;
}

export interface IRecipeByUserFavCuisine {
  name: string;
  recipes: IRecipe[];
}
