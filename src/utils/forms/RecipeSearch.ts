import * as yup from "yup";

export const recipeSearchForm = yup.object().shape({
  recipe: yup.string().trim().min(2).required("This field can't be empty."),
  // body: yup.string().trim().min(50).required("This field can't be empty."),
  // tag: yup.string().trim().required("This field can't be empty."),
});
