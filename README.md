![alt text](https://raw.githubusercontent.com/CrystallizeAPI/react-growl/HEAD/media/logo.png 'Abstract robot with teeths')

# @crystallize/react-growl

The [React Growl Notifications](https://crystallize.com/developers/react-components/react-growl-notifications) module used in [Crystallize PIM](https://pim.crystallize.com). This is a generic React package initially built for the [React boilerplates](https://crystallize.com/developers) powered by [Headless Ecommerce](https://crystallize.com/product).

![alt text](https://raw.githubusercontent.com/CrystallizeAPI/react-growl/HEAD/media/react-growl.gif 'Growl notifications preview')

## Install

```
yarn add @crystallize/react-growl styled-components framer-motion
```

or

```
npm install @crystallize/react-growl styled-components framer-motion
```

The module requires two peer dependencies which are used in [Crystallize PIM](https://pim.crystallize.com), `styled-components` and `framer-motion`

## Usage

### In Layout or somewhere outside the route definition:

```
import { GrowlScene } from '@crystallize/react-growl';

<body>
    <GrowlScene />
    <MyApp />
</body>
```

### Call it!

```
import { growl } from '@crystallize/react-growl';

// Regular
const myGrowl = await growl({
    title: 'Good job',
    message: 'You got this growl to work!'
});

// With JSX and a type
const myGrowl = await growl({
    title: 'Title goes here',
    message: <b>Hey, I can use JSX!</b>,
    type: 'error'
});

// Sticky, user cannot close it
const myGrowl = await growl({
    title: "I'm sticky",
    message: 'You just try to remove me!',
    sticky: true
});

// Custom timeout
const myGrowl = await growl({
    title: "I'll go away quickly",
    message: 'It will only be in your life for 2 seconds',
    timeout: 2000
});
```

## Growl props

| Prop name | Type    | Default                     | Description                                                                            |
| --------- | ------- | --------------------------- | -------------------------------------------------------------------------------------- |
| type      | string  | info                        | The type of growl. One of "info", "warning" or "error"                                 |
| timeout   | number  | (inherited from GrowlScene) | Set a custom timeout (in milliseconds) for the growl instance                          |
| title     | string  | null                        | The title                                                                              |
| message   | string  | null                        | The message                                                                            |
| sticky    | boolean | false                       | If the growl should "stick" to the screen and hide the close button and not auto close |

## Growl instance

When you call growl, you can await the growl instance. On the instance you have the following methods available

### instance.update

```
myGrowl.update({
    type: 'warning',
    title: 'New title',
    message: <div>New message</div>,
    sticky: true
})
```

Takes the same arguments as growl(). Updates the growl in-place.

### instance.hide

```
myGrowl.hide()
```

Hide the growl manually, because it is a static growl, or because you do not want to wait for the auto timeout.

## GrowlScene props

| Prop name      | Type      | Default |
| -------------- | --------- | ------- |
| growlComponent | Component | null    |
| defaultTimeout | number    | 7000    |

Whatever other props you pass will be forwarded along to the underlying UL
