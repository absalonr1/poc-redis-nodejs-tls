# poc-redis-nodejs-tls

https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js

Using Node.js v12.2.0, I can import all standard modules like this:

```
import * as Http from 'http'
import * as Fs from 'fs'
import * as Path from 'path'
import * as Readline from 'readline'
import * as Os from 'os'
```
Versus what I did before:

```
const
  Http = require('http')
  ,Fs = require('fs')
  ,Path = require('path')
  ,Readline = require('readline')
  ,Os = require('os')
```
Any module that is an ECMAScript module can be imported without having to use an .mjs extension as long as it has this field in its package.json file:

```
"type": "module"
```

So make sure you put such a package.json file in the same folder as the module you're making.

And to import modules not updated with ECMAScript module support, you can do like this:

```
// Implement the old require function
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Now you can require whatever
const
  WebSocket = require('ws')
  ,Mime = require('mime-types')
  ,Chokidar = require('chokidar')
```
And of course, do not forget that this is needed to actually run a script using module imports (not needed after v13.2):

```
node --experimental-modules my-script-that-use-import.js
```

And that the parent folder needs this package.json file for that script to not complain about the import syntax:

```
{
  "type": "module"
}
```

If the module you want to use has not been updated to support being imported using the import syntax then you have no other choice than using require (but with my solution above that is not a problem).

I also want to share this piece of code which implements the missing __filename and __dirname constants in modules:

```
import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```