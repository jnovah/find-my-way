# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171128022041) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "legs", force: :cascade do |t|
    t.bigint "trip_id", null: false
    t.boolean "current", default: false
    t.boolean "complete", default: false
    t.integer "origin_id", null: false
    t.integer "destination_id", null: false
    t.integer "order", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.hstore "distance", default: {}, null: false
    t.hstore "duration", default: {}, null: false
    t.hstore "origin_location", null: false
    t.hstore "destination_location", default: {}, null: false
    t.index ["trip_id"], name: "index_legs_on_trip_id"
  end

  create_table "memories", force: :cascade do |t|
    t.bigint "place_id", null: false
    t.string "type", null: false
    t.string "image"
    t.text "text_body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["place_id"], name: "index_memories_on_place_id"
  end

  create_table "places", force: :cascade do |t|
    t.bigint "trip_id", null: false
    t.string "type", null: false
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_places_on_trip_id"
  end

  create_table "trips", force: :cascade do |t|
    t.bigint "user_id"
    t.string "title", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.hstore "bounds", default: {}, null: false
    t.boolean "planning", default: true, null: false
    t.boolean "en_route", default: false, null: false
    t.boolean "completed", default: false, null: false
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", null: false
    t.string "uid", null: false
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
