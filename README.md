# Summer

> A simple flexible assessment web app that can be inserted into any webpage and retains its data through page loads. It is ready to be tied into APIs to consume and send data.

[Live Demo](deeply-purpose.surge.sh/#/chapters/102/welcome)

## Usage

Update the data in app/routes/index.js to populate chapters, questions, answers.

## Features

* Can be loaded async based on environment
* Maintains data through page loads.
* `member` (object). Info about the user.
* `chapter` (object). Contains questions.
* `question` (object). Contains options. Supports single select, multi-select, and text input.
* `option` (object). Belongs to one question.
* `tag` (object). A unit of data about the member. Used by member_consequences to calculate outcomes
** Certain tags cause chapter to terminate.
** Certain tags cause consequence_links to populate for the member.
* `member_consequences` (service). Calculates the outcome based on tag data.
* `consequence_links` (array). List of links that can be populated by member_consequences.

## What's next?

* Fix bug that requires that the entire chapter be traversed to calculate correctly.
* More flexible consequences.
* More flexible pagination.
* Move mock API data to Mirage. Doesn't belong in index.js.
* Support multiple chapters.
* Required fields.
* Get user ID from API to allow other web apps to store the data.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

