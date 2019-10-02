# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create!(name:"Andy")
u2 = User.create!(name:"Mason")
u3 = User.create!(name:"Amy")
u4 = User.create!(name:"Dan")
u5 = User.create!(name:"Jason")
u6 = User.create!(name:"Jon")
u7 = User.create!(name:"Tom")
u8 = User.create!(name:"Daniel")
u9 = User.create!(name:"Darrow")
u10 = User.create!(name:"Berlinda")

s1 = Score.create!(user: u1, score: "00:01:12")
s2 = Score.create!(user: u1, score: "00:02:12")
s3 = Score.create!(user: u1, score: "00:03:12")
s4 = Score.create!(user: u1, score: "00:04:12")
s5 = Score.create!(user: u1, score: "00:05:12")
s6 = Score.create!(user: u1, score: "00:06:12")
s7 = Score.create!(user: u1, score: "00:01:14")
s8 = Score.create!(user: u1, score: "00:02:16")
s9 = Score.create!(user: u1, score: "00:10:12")
s10 = Score.create!(user: u1, score: "00:00:45")
s1 = Score.create!(user: u2, score: "00:00:16")
s2 = Score.create!(user: u3, score: "00:20:12")
s3 = Score.create!(user: u4, score: "00:05:12")
s4 = Score.create!(user: u5, score: "00:01:17")
s5 = Score.create!(user: u6, score: "00:00:54")
s6 = Score.create!(user: u7, score: "00:02:44")
s7 = Score.create!(user: u8, score: "00:03:12")
s8 = Score.create!(user: u8, score: "00:04:12")
s9 = Score.create!(user: u9, score: "00:05:12")
s10 = Score.create!(user: u10, score: "01:00:12")