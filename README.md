# reware
the image optimization service

[![Build Status](https://ci.arcstatus.com/buildStatus/icon?job=a1motion%2Freware%2Fmaster)](https://ci.arcstatus.com/job/a1motion/job/reware/job/master/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fa1motion%2Freware.svg?type=shield&style=flat-square)](https://app.fossa.com/projects/git%2Bgithub.com%2Fa1motion%2Freware?ref=badge_shield)

## Install

```bash
$ yarn add reware
```

## Usage

```js
const express = require('express')
const reware = require('reware')

const app = express()
app.use('/images', reware())

app.listen(3000)
```
