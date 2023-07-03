import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// if (module.hot) {
//   module.hot.accept();
// }

// * get API from "https://forkify-api.herokuapp.com/v2"

// *--------------------------controlRecipe--------------------------
const controlRecipe = async function () {
  try {
    // Check ID from Recipe:
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Loading Recipe:
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // Rendering Recipe:
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// *--------------------------controlSearchResults--------------------------
const controlSearchResults = async function () {
  try {
    // Check Query from Search bar:
    const query = searchView.getQuery();
    if (!query) return;

    // Loading Search Results:
    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    // Rendering Search Results:
    resultsView.render(model.getSearchResultPage());

    // Rendering Page Numbers:
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// *--------------------------controlPagination--------------------------
const controlPagination = function (goToPage) {
  // Rendering New Results:
  resultsView.render(model.getSearchResultPage(goToPage));

  // Rendering New Page Numbers:
  paginationView.render(model.state.search);
};

// *--------------------------init--------------------------
(function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
})();
