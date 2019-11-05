class Category < ApplicationRecord
    attr_accessor :level

    has_many :books, dependent: :destroy

    has_many :subcategories, class_name: "Category", foreign_key: "supercategory_id", dependent: :destroy
    belongs_to :supercategory, class_name: "Category", optional: true

    validates :name, presence: true
end
