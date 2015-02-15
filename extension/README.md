# Titans-Toolbox
Referral system

# RoadMap

MVP
* Referral monetization system
* Facebook Dislike

@Todo 
* Research point referral kicks in ( checkout screen, adding item to a cart ), this way we can redirect only when needed so the user does not get annoyed at the constant refreshing

V 1.0.0
* Slap
* Server health check
* On dislike / Action fade out screen around input box around text field and ask user for support to encourage others to get the plugin

V 3.0.0
* Animations for events

V 4.0.0
* Custom Themes

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
             
    