<?php

    $post = file_get_contents('php://input');

    if(! empty($post)) {
        echo ($post);

        exit;
    }

?>

<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Backbone JS - Main</title>
        <link rel="icon" href="/assets/images/favicon.png">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="/assets/css/normalize.css">
        <link rel="stylesheet" href="/assets/css/bootstrap.css">
        <link rel="stylesheet" href="/assets/css/custom.min.css">

        <script src="/assets/js/lib/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor03">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search">
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>

        <div class="container">

            <div class="row">
                <div class="col-md-12">
                    <h2>Welcome to BackBone - Songs app</h2>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <form class="form-group" action="">
                        <div class="form-group">
                            <label class="form-control-label" for="title">Title</label>
                            <input type="text" placeholder="Type title of the song" class="form-control is-valid" id="title">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="author">Author</label>
                            <input type="text" placeholder="Type author of the song" class="form-control is-valid" id="author">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="author">Artist</label>
                            <input type="text" placeholder="Type artist of the song" class="form-control is-valid" id="artist">
                        </div>

                        <br />
                        <button type="submit" class="btn btn-outline-secondary">Add</button>
                    </form>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <hr />
                    <ul id="songs"></ul>
                </div>
            </div>

        </div>


        <script src="/assets/js/lib/jquery-min.js"></script>
        <script src="/assets/js/lib/underscore-min.js"></script>
        <script src="/assets/js/lib/backbone-min.js"></script>
        <script src="/assets/js/bbscript.js"></script>
        <script src="/assets/js/jqscript.js"></script>

    </body>
</html>