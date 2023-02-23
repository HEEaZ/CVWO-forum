# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create!(username: "seed", email: "seed", password: "seed");

Post.create!(title: "Seeded Post", body: "This is a post loaded from the seed", user_id: 1, tags: ["seed", "test"]);
Post.create!(title: "2nd Seeded Post", body: "This is the 2nd post loaded from the seed", user_id: 1, tags: ["seed", "test"]);

Comment.create!(body: "This is a comment generated from the seed", user_id: 1, post_id: 1);
