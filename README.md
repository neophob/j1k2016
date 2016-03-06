# js2016


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