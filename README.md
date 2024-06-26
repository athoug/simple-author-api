# Author API

a simple author api that serves my favorite authors 

### Routes
the routes are as follows:
- `/api` -> gives all the authors
- `/author?q=*author name*` -> gives a specific author

### Data
The data was manually populated where I made a structure of what I want the data to have and populated it using AI 
Here is the structure 
``` json
  {
    "id": "10",
    "type": "authors",
    "attributes": {
      "name": "Isaac Asimov",
      "date_of_birth": "1920-01-02",
      "date_of_death": "1992-04-06",
      "wikipedia": "https://en.wikipedia.org/wiki/Isaac_Asimov",
      "photos": "https://upload.wikimedia.org/wikipedia/commons/3/34/Isaac.Asimov01.jpg",
      "nationality": "American"
    },
  "books": [
    {
      "id": "1",
      "title": "Foundation",
      "isbn": null,
      "number_of_pages": null,
      "year_of_publication": 1951,
      "author_id": "10",
      "wikipedia": "https://en.wikipedia.org/wiki/Foundation_(Asimov_novel)",
      "book_cover": "https://en.wikipedia.org/wiki/Foundation_(Asimov_novel)#/media/File:Foundation_-_Isaac_Asimov_(Gnome_1951).jpg",
      "average_rating": 4.15,
      "genre": "Science Fiction"
    },
    {
      "id": "2",
      "title": "I, Robot",
      "isbn": null,
      "number_of_pages": null,
      "year_of_publication": 1950,
      "author_id": "10",
      "wikipedia": "https://en.wikipedia.org/wiki/I,_Robot",
      "book_cover": "https://en.wikipedia.org/wiki/I,_Robot#/media/File:I_robot.jpg",
      "average_rating": 4.18,
      "genre": "Science Fiction"
    }
  ]
  }
```
