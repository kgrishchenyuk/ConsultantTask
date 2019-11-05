# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create(name: "Literature")
Category.create(name: "Russian", supercategory_id: 1)
Category.create(name: "English", supercategory_id: 1)
Category.create(name: "Classic", supercategory_id: 2)
Category.create(name: "Modern", supercategory_id: 2)
Category.create(name: "Classic", supercategory_id: 3)
Category.create(name: "Modern", supercategory_id: 3)
Category.create(name: "Mathematics")
Category.create(name: "Mathematical Analysis", supercategory_id: 8)
Category.create(name: "Probability Theory", supercategory_id: 8)
Category.create(name: "Linear Algebra", supercategory_id: 8)

Book.create(name: "War and Peace", category_id: 4)
Book.create(name: "Fathers and Sons", category_id: 4)
Book.create(name: "War and Peace", category_id: 4)
Book.create(name: "Romeo and Juliet", category_id: 6)
Book.create(name: "The Lord of the Rings", category_id: 7)