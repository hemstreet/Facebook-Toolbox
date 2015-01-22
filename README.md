# Titans-Toolbox
Referral system

# RoadMap

MVP
* Referral monetization system
* Facebook Dislike

V 1.0.0
* Slap

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
    