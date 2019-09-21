# factory svg animation
## for battle of the bits major "GraphX"

The root of this repo contains the HTML version of this animation, the builds directory contains both minified and non-minified versions of the SVG file.

### Note

\<script\> and \<style\> are both in the SVG 1.1 specification and are perfectly reasonable tags to use on SVG graphics to be viewed on web browsers. While many other image viewers may have issues with the animated part of this SVG file, it was intended from the start that this entry would only be viewed in web browsers, since only recent web browsers have full implementations of the SVG spec.

### Description

All SVG elements/assets made in Inkscape, with some minor editing (such as ids of elements), with CSS and JS code added later. Animations are made using CSS3 keyframes/transitions and are controlled by the script which mostly involves resetting certain animated elements and setting random colour etc.

All animations are initially defined as CSS only keyframe animations which run once at the start when the file is first loaded, however using an "animationend" event listener on a dummy animation object which acts as a counter when most of the animations should be reset.

```javascript
el.style.animation = "none";
el.clientHeight;
el.style.animation = null;
```

This code is used to reset the animation of one element by first overwriting its pre-defined animation property with "none" and then "reflowing" the element by computing its clientHeight property which all SVG objects have. Finally, removing the `animation: none` property from the element makes the animation property return to its pre-defined state.

After the dummy animation is over and the "animationend" event fires, predefined elements in the array animatedObjects and pistonObjects are queried, found and the reset function applied, which starts the animation all over again, albeit with different CSS properties (such as changing fill values).

The sequence of animations themselves are controlled by CSS animation delay, running multiple animations on the same element which is supported in CSS3.

### Separate Animations

- The conveyor belts are animated by controlling the stroke-dashoffset property which is controllable via CSS, which replays infinitely. This works as the belt itself is a path with a dash applied.

- All the cube/piston animations are carefully sequenced so that they align correctly on time, which was a little bit difficult to do as the only thing you can control with CSS animations is the timing, delay and the animation itself.

- The pixelisation filter effect is created using two separate objects, the original note object and the already pixelised version, where a CSS animation changes the opacity/visibility of both objects at the same time, making it appear as if they changed as the note moves through the "filter". I used the steps() function to instantly change the opacity/visibility of the note objects, instead of gradually (which would happen using a timing function such as linear or ease-in-out).
