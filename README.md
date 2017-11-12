# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
    `Ruby 2.3.3`

* System dependencies
    Yarn:
      run `yarn install`
    Gems:
      run `bundle install`

* Configuration
  Foreman:
    run `gem install foreman`


* Database creation
    run `rails db:create`

* Database initialization
    run `rails db:migrate`

* How to run the test suite
    RSpec:
      run `rake`
    Karma:
      run `karma start`

* Services (job queues, cache servers, search engines, etc.)
    Google OmniAuth2 server:
      * You will need your own google client id and secret id in order to start up the app as these are required in for initialization
    Google Maps API:
      * Key is available

* Deployment instructions
    On local server (if using foreman):
      run `foreman start`
    If you decide not to use foreman:
      run `rails server`
      then `./bin/webpack-dev-server`
    Both methods can run via localhost:3000. If foreman isn't working attempt to start on localhost:5000.

* ...

![Build Status](https://app.codeship.com/projects/9d31b790-98a2-0135-163f-5a0d318eb11b/status?branch=master)
![Code Climate](https://codeclimate.com/github/uncommonAP/find-my-way.png)
![Coverage Status](https://coveralls.io/repos/uncommonAP/find-my-way/badge.png)
