import express from "express";

import controller from '../controllers/search.controller.js'

const searchRouter = express.Router();

searchRouter.get('', controller.searchText)

export default searchRouter;