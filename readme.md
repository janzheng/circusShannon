

# Getting Started 

This project is Shannon McKenna's personal circus performance and portfolio site. It's built on Middleman. Feel free to peruse, clone, and use it for your own benefit.

The CSS is built off of a home-grown framework called [StyleCoeur](github.com/janzheng/stylecoeur).


----

todo
- photos

- todo w/ shannon: professional services list . what can yuo hire Shannon for
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


Deploying to Github uses [middleman deploy](https://github.com/middleman-contrib/middleman-deploy):

~~~
  bundle exec middleman build [--clean]
  bundle exec middleman deploy [--build-before]
~~~
## Design

The main `circusshannon.com` site is horizontally scrolling, which isn't really good for mobile sites. Instead, any screens -sm and above will be horizontally scrolling, while -xs will become vertically scrolling. Grids can support this kind of reflowing.

The content will be organized into `<sections />` and will be completely display agnostic.


~ Jan


