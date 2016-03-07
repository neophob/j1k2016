# js2016 - lazer!

compo entry for http://js1k.com/2016-elemental/

## hacks

open node_modules/regpack/regPack.js and change those settings:

```
			withMath : true,
			hash2DContext : true,
			hashWebGLContext : false,
			hashAudioContext : false,
			contextVariableName : 'c',
```

this safes about 50 bytes. there should be some kind of cli parameters, but i'm too lazy to figure out how...
