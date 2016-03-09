# js2016 - Lazer

Compo entry for http://js1k.com/2016-elemental/, demo url: http://js1k.com/2016-elemental/demo/2516

Random Notes:
- Regpack reduce the framerate from 45fps to 23fps (ff45)
- Canons alpha values looks different in ff45 and chrome49 ("rgba(255, 0, 255, 0.006)")
- Mobile browser also looks different (planet alpha value and canon alpha value)
- Optimized for Chrome 49/Safari 9 on desktop - but works on other browsers too

## hacks

open node_modules/regpack/regPack.js and change those settings:

```
var default_options = {
  withMath : true,
  hash2DContext : true,
  hashWebGLContext : false,
  hashAudioContext : false,
  contextVariableName : 'c',
  contextType : parseInt(0),
  reassignVars : true,
  varsNotReassigned : ['a', 'b', 'c'],
  crushGainFactor : parseFloat(0),
  crushLengthFactor : parseFloat(0),
  crushCopiesFactor : parseFloat(0),
  crushTiebreakerFactor : parseInt(1),
  wrapInSetInterval : false,
  timeVariableName : ""
};
```

this safes about 50 bytes. there should be some kind of cli parameters, but i'm too lazy to figure out how...
