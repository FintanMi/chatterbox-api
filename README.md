# Chatterbox

Chatterbox is a social media site for sharing images where users can follow and comment on all content in an unrestrcited manor.
<br>
The live link can be found here: []()
<br>
mockup goes here

### Site Goals
Chatterbox is a site for everyone to post their favourite photos and maybe find new people to follow based on the content they are providing.

### Agile Planning
This project was developed utilising agile principles where features were added in small, incremental sprints over numerous weeks.

<hr>

## Epics

**Set up**
This Epic focused on the backend portion of the project with the Django Rest Framework being implemented for the API.

**Posts**
This Epic covers the API endpoint creation and database connections relating to the CRUD functionality of user posts, which includes like activity.

**Comments**

This Epic covers all API endpoint creation and database connections relating to the CRUD functionality of user comments in relation to posts.

**Profiles**

This Epic covers all API endpoint creation and database connections relating to the CRUD functionality of user created profiles, which includes follow/unfollow functionality.

<br>

### User Stories
**Setup**
* As a developer, I need to create the backend in order to have features present for users on the site
* As a developer, I need to create a connection to Cloudinary so static images can be uploaded
* As a user, I want to be able to create an account and have access to features on the site

**Posts**
* As a user, I want to be able to create, view, edit or delete a post

**Profiles**
* As a developer, I want a user to have a blank profile page with a default avatar photo when its created by any user
* As a user, I want to see other profiles that have been created

### API Endpoints
User story
`As a developer, I need to create a base project set up so that I can build out the features that will be shown on the frontend.`

Implementation:

The project was created with all neccessary packages installed and frozen into the requirements.

The settings were also edited to hide any secret variables and set dev and production environments apart.

User Story
`As a developer, I have to connect Cloudinary to the project so static images can be uploaded by the users`

Implementation:
A Cloudinary account was created, the API environment was added to the settings file to ensure photos could be uploaded

User Story
`As a user I can create a new account so that I can access all the features for signed up users`

Implementation:
Django rest framework and dj_rest_auth were installed and added to the url patterns and site packages to make use of their built in authentication system

User Story:

`As a user, I want to be able to view create, edit or delete a post`

Implementation:

Endpoint: /posts/

Methods:
* POST - Used to create post
* GET - Used to get a list of posts

Endpoint: /posts/<int:pk>/

Methods:
* GET - Get a single post
* PUT - Used to update a single post
* DELETE - Used to delete a post

## Database Design
## Security
A permissions class was added called IsOwnerOrReadOnly to ensure only users who create the content are able to edit or delete it.

## Technologies

* Django - Main framework used for application creation
* Django REST Framework - Used for creating the API
* Heroku - Used for hosting the application
* Git - Used for version control
* Github - Repository for storing code base and docs
<br>
## Python Packages
* Django
* dj-rest-auth
* dj-database-url
* django-allauth
* django-cors-headers
* django-filter
* django-storages
* djangorestframework
* djangorestframework-simplejwt
* gunicorn
* Pillow
* psycopg2
* PyJWT

Installed dependencies:
* Cloudinary

## Testing
<br>

## Deployment
## Version Control
The site was created using the Visual Studio Code editor and pushed to github.
The following git commands were used throughout development to push code to the remote repo:

```git add <file>``` - This command was used to add the file(s) to the staging area before they are committed.

```git commit -m “commit message”``` - This command was used to commit changes to the local repository queue ready for the final step.

```git push``` - This command was used to push all committed code to the remote repository on github.
<br>
## Heroku Deployment
The site was deployed to Heroku. The steps to deploy are as follows:

* Navigate to heroku and create an account
* Click the new button in the top right corner
* Select create new app
* Enter app name
* Select region and click create app
* Click the resources tab and search for Heroku Postgres
* Select hobby dev and continue
* Go to the settings tab and then click reveal config vars
* Add the following config vars:
  *
  *
  *
  *
* Click the deploy tab
* Scroll down to Connect to GitHub and sign in / authorize when prompted
* In the search box, find the repositoy you want to deploy and click connect
* Scroll down to Manual deploy and choose the main branch
* Click deploy
<br>


  
