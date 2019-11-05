class CategoriesController < ApplicationController
    def index
        @categories = Category.all
    end

    def create
        @category = Category.create(category_params)
        @category.level = params[:category][:level].to_i
        respond_to do |format|
            format.js { }
        end
    end

    def update
        @category = Category.find(params[:id])
        @category.update(category_params)
        respond_to do |format|
            format.js { }
        end
    end

    def destroy
        Category.find(params[:id]).destroy
        respond_to do |format|
            format.js { }
        end
    end

    private def category_params
        params.require(:category).permit(:name, :supercategory_id, :level)
    end
end
