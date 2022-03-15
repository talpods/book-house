import asyncHandler from "../common/asyncHandler.js";
import ProjectDependencies from "../../configs/ProjectDependencies.js";
import booksController from "../../controllers/booksController.js";

const controller = booksController(ProjectDependencies);
const { isAdmin } = ProjectDependencies;

export default (router) => {
	const {
		getAllBooks,
		getAllBooksByCategory,
		getSingleBook,
		addNewBook,
		updateExistingBook,
		deleteSingleBook,
	} = controller;
	router.get("/", asyncHandler(getAllBooks));

	// @route Get api/books/{category}
	// @desc get all books with a total field in a specific category
	// @access public
	router.get("/category/:category", [], asyncHandler(getAllBooksByCategory));

	// @route Get api/books/book/{slug}
	// @desc get single book by slug
	// @access public
	router.get("/book/:slug", [], asyncHandler(getSingleBook));

	// @route Post api/books/
	// @desc save new book
	// @access private
	router.post("/", [isAdmin], asyncHandler(addNewBook));

	// @route Patch api/books/{slug}
	// @desc save new book
	// @access private
	router.patch(
		"/update-book/:slug",
		[isAdmin],
		asyncHandler(updateExistingBook)
	);

	// @route Patch api/books/{slug}
	// @desc save new book
	// @access private
	router.delete(
		"/delete-book/:slug",
		[isAdmin],
		asyncHandler(deleteSingleBook)
	);

	return router;
};
