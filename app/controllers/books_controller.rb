class BooksController < ApplicationController
    def index
        @books = Category.find(params[:category_id]).books
        respond_to do |format|
            format.js { }
        end
    end
    
    def create
        @book = Category.find(params[:category_id]).books.create(book_params)
        respond_to do |format|
            format.js { }
        end
    end

    def update
        @book = Category.find(params[:category_id]).books.find(params[:id])
        @book.update(book_params)
        respond_to do |format|
            format.js { }
        end
    end

    def destroy
        Category.find(params[:category_id]).books.find(params[:id]).destroy
        respond_to do |format|
            format.js { }
        end
    end

    private def book_params
        params.require(:book).permit(:name)
    end
end
