![alt text](https://raw.githubusercontent.com/snowballdigital/react-growl/HEAD/media/logo.png 'Abstract robot with teeths')

# @crystallize/react-growl

A package for [React Growl Notifications](https://crystallize.com/developers/react-components/react-growl-notifications). This is a generic React package initially built for the [React Commerce boilerplate](https://crystallize.com/developers) in [Crystallize](https://crystallize.com).

## Install

```
yarn add @crystallize/react-growl
```

## Usage

### In Layout or somewhere outside the routes:

```
import { GrowlComponent } from '@crystallize/react-growl';

<main>
    <GrowlComponent />
```

### Call it!

```
import growl from '@crystallize/react-growl';

growl('Hey dude!');

growl({
    message: <b>Some bold text</b>,
    type: 'error'
});
```
