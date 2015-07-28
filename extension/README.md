# Titans-Toolbox

# RoadMap

MVP
* Facebook Dislike

@Todo 
* Server health check

V 1.0.0
* Slap
* On dislike / Action fade out screen around input box around text field and ask user for support to encourage others to get the plugin

V 2.0.0 
* GIF support ( new button to upload a post, grab storyKey, replace image with custom gif )
    
V 3.0.0
* Animations for events

V 4.0.0
* Custom Themes

    Themes are dropped in
    Facebook object query for each element, save as variable ( dom ) eg.
    
    facebook.chatList
    facebook.navBar
    facebook.newsFeed

    Retrieve theme via /user/{userName}/current-theme
            
            Get json back with name
            browse local cache for same filename
            bootstrap files in for that theme on load

    Download new theme via /user/{userName/theme/{themeName}.   
        Get json config back 
            {
                "name" : "XYZ Theme",
                "key"  : "xyz-theme",
                "version" : 0.0.1
            }
            
            In same directory look for
            - theme.js
            - theme.css
            
        Save files in local browser cache
        
        @TODO 
            * flag for on page load, remove facebook's css file searching the dom, add in a blank boiler plate template that gives basic styles
            * pre select containers for easy dom manipulation facebook.chatBox, facebook.newsFeed, etc..
            * all_frames = true, open iframe of different sites and save the dom elements ( open
             
             Theme Ideas 
                https://www.behance.net/gallery/9894359/Facebook-Redesign-Concept
                http://www.vandelaydesign.com/facebook-news-feed-redesign-concepts/
                https://www.behance.net/gallery/Facebook-New-Look-Concept/6504647
                http://line25.com/articles/30-unofficial-redesigns-of-popular-social-media-sites
                https://www.behance.net/gallery/Facebook-Evolution/14138873
                
            Inspiration
                https://www.behance.net/gallery/Yahoo-Redesign-Concept/13832169
             
    
Future Ideas
    gif integration into chat.
    * Stew gif {Search-query}
    * this will go to http://giphy.com/search/{Search-query} and pick the a random image use src from data-animated