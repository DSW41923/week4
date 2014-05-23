/**
 * PostController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
    list: function (req, res) {
      
        Post.find({}).exec(function (err, posts) {
          
          res.view("home/list", {
              posts: posts
          });
          
      }); 
        
    },
  
    create: function (req, res) {
        //var title = req.body.title;
        //var content = req.body.content;
        
        Post.create({
            title: req.body.title,
            content: req.body.content
        }).exec(function (err, posts) {
            
          res.redirect("/");          
            
      }); 
    },
    
    destroy: function (req, res) {
        
        Post.findOne(req.param("id")).exec(function(err, post) {
          // we now have a model with instance methods attached
          // destroy the record
          Post.destroy(function(err) {
            // record has been removed            
          });
            
            res.redirect("back");
        });
    },
    
    updatePage: function (req, res) {
     var id = req.param("id");

     Post.findOne({
       id: id
     }).exec(function (err, post) {
       if (err) {
         req.flash("info", "info: you point to wrong number");
         return res.redirect("/");
       }
       return res.view("home/update", {
         post: post
       });
     });
   },

  /**
   * Action blueprints:
   *    `/post/update`
   */
   update: function (req, res) {
    var id = req.param("id");
    var title = req.body.title;
    var content = req.body.content;

    if (title && content && title.length > 0 && content.length > 0) {
      // update post
      Post.update({
        id: id
      }, {
        title: title,
        content: content
      })
      .exec(function (err, post) {
        if (err) {
          req.flash("info", "info: you point to wrong number");
        }
         res.redirect("/");
      });
    }
    

    // // Send a JSON response
    // return res.json({
    //   hello: 'world'
    // });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostController)
   */
  _config: {}

  
};
    