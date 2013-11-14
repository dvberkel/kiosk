kiosk
=====

Webapp to rotate through a set of webpages.

## How to use
- After firing up the HTML page, enter a (full) URL in the text box.
- Click `Load`, and see whether it is indeed the page you intend. 
- Then, click `Push` to add it to your list of pages.
- Once you have added all pages you need, click `Loop` to start your presentation, which will cycle through all pages
- You can set the time (in ms) to show each page in the last text box.


## Known issues
- This solution uses an `iframe` to show your pages. This may not work well with all applications, especially those that set `X-Frame-Options` to `DENY`.


## Do I need to host this myself?
That's possible, but not necessary. You can use [htmlpreview.github.io][htmlpreview] to run it directly from Github. [Try it out!][onlinedemo]


[onlinedemo]: http://htmlpreview.github.io/?https://github.com/dvberkel/kiosk/blob/master/index.html

[htmlpreview]: htmlpreview.github.io