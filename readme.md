

# Getting Started 

This project is set up as a deliverable, where the landing page and style guides are two parts of this deliverable. Following NDA restrictions, the entire site is stored and generated locally, so no host is necessary, but still has the nice-to-haves of a local server, like SASS, bundling, plugins, kramdown, and so on.

The documentation is written in a combination of ERB, Kramdown (variant of Markdown), and HTML, supported by SCSS.



----

todo
- hash intercept for URL
- loader to prevent ugly menu pop
- professional services list . what can yuo hire Shannon for
- something cute at the rightmost area
- mobile vertical scroller
- photos
- form sender
----


## Setup

I'm using [Middleman](https://middlemanapp.com), a Rails-based static-site generator to build and preview the example files. If you've never used Rails, don't fret—I hadn't really either until I found Middleman. It's super simple to set up.

Install Ruby if you don't have it, then follow the middleman steps to install it as a gem.

Launching the documentation:

~~~
  bundle exec middleman server
~~~

then preview on `http://localhost:4567`


Compiling the documentation:

~~~
  bundle exec middleman build
~~~

Middleman can watch for updates to the source code and build as the source is updated. Again, use the middleman build as a backbone for your React App; whether you want to keep the Middleman static site as a purely marketing site or eventually folding it into your React App is up to you.


## Design

The main `circusshannon.com` site is horizontally scrolling, which isn't really good for mobile sites. Instead, any screens -sm and above will be horizontally scrolling, while -xs will become vertically scrolling. Grids can support this kind of reflowing.

The content will be organized into `<sections />` and will be completely display agnostic.