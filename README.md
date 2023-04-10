# JavaScript-Music-Player

## User Story

AS a lover of music

I WANT to use a single page web-based music player that lets me choose a song file for an artist from my local computer and automatically create a playlist on the left hand side of the music player, creating a list of my favorite songs

SO THAT I can search that artist in the event column and see what upcoming shows the artist is going to have.

Originally we were to use two APIs in order to have access to an unlimited source of music that could be accessed by searching for any artist, the original plan was to use the Spotify API, which we were eventually not able to get control of. The current MVP has a basic HTML, CSS, JavaScript coding using a musicPlayer sheet to pull song files from your computer in order to demonstrate what the original idea was supposed to do.

As of right now you can select to choose a file, the song will autoplay, and it will be automatically added to the playlist. Once you have a list of artists you like, you can go to the events search bar and starting typing in the different artists to see what their upcoming shows may be, this is using the TicketMaster API. 

![image](https://user-images.githubusercontent.com/121475398/230816146-9284c71f-86f8-4f90-8cc4-6428ef2e577d.png)

Once you see the events, you can go ahead and clear your playlist and then start again. 

Styling for this project was doing using Foundation and was used in all three files, Index HTML, CSS, and Javascript. The ticketmaster API was used from this source: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/ and the styling within the JS was collected over a few different articles from google search, "HTML +="
