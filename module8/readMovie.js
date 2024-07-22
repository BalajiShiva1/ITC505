const fs = require('fs');

fs.readFile('movies.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const parsedData = JSON.parse(data);

    // Accessing the first movie's title
    console.log('First movie title:', parsedData.movies[0].title);

    // Accessing the second movie's director
    console.log('Second movie director:', parsedData.movies[1].director);

    // Accessing the actors in the first movie
    console.log('Actors in the first movie:', parsedData.movies[0].actors);

    // Convert the parsed data back to a JSON string
    const jsonString = JSON.stringify(parsedData, null, 2);
    console.log('JSON data as string:', jsonString);
});
