![alt text](https://raw.githubusercontent.com/CrystallizeAPI/react-growl/HEAD/media/logo.png 'Abstract robot with teeths')

# @crystallize/react-growl

The [React Growl Notifications](https://crystallize.com/developers/react-components/react-growl-notifications) module used in [Crystallize PIM](https://pim.crystallize.com). This is a generic React package initially built for the [React boilerplates](https://crystallize.com/developers) powered by [Headless Ecommerce](https://crystallize.com/product).

![alt text](https://raw.githubusercontent.com/CrystallizeAPI/react-growl/HEAD/media/react-growl.gif 'Growl notifications preview')

## Install

```
yarn add @crystallize/react-growl styled-components framer-motion
```

The module requires two peer dependencies which are used in [Crystallize PIM](https://pim.crystallize.com), `styled-components` and `framer-motion`

## Usage

### In Layout or somewhere outside the routes:

```
import { GrowlScene } from '@crystallize/react-growl';

<main>
    <GrowlScene />
```

### Call it!

```
import growl from '@crystallize/react-growl';

// Regular
growl({
    title: 'Good job',
    message: 'You got this growl to work!'
});

// With JSX and a type
growl({
    title: 'Title goes here',
    message: <b>Hey, I can use JSX!</b>,
    type: 'error'
});

// Sticky, user cannot close it
growl({
    title: 'Title goes here',
    message: <b>Hey, I can use JSX!</b>,
    sticky: true
});
```

### Use a custom growl component

```
<GrowlProvider growlComponent={MyCustomGrowlComponent}>

function MyCustomGrowlComponent({ message, type, remove }) {
    return <div onClick={remove}>{type} {message}</div>
}
```
