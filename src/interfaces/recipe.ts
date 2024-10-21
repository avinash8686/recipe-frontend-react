export interface IRecipe {
  _id: string;
  title: string;
  description: string;
  cuisineId?: string;
  isFavorite: boolean;
}
