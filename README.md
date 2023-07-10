# 🤖 Slapbot Dashboard

![Starter Image](/public/dashboard.png)
Created to give a responsive interface to all the [bots]() that I've created (.
This is a work in progress and will be updated as I continue to build out the bots.

Each user will have a single profile linking their entire social media presence together.
### Run the app

1. Have the python backend running `python ../cli.py backend` _(from the root directory of this social-bots-collection)_
2. Install the deps ```npm install```
3. Run the frontend ```npm run dev```

### Stuff used

- [Nuxt 3](https://v3.nuxtjs.org/)
- [Pinia (State Manager)](https://pinia.vuejs.org/)
- [Vue-sound](https://www.npmjs.com/package/vue-sound) audio player
- [Vuetify](https://vuetifyjs.com/en/) UI Framework


### Custom Sass File

The `.scss` file that can be found in the `assets` folder have some gradients & other styles. They can be deleted or updated.

### Helpers Folder

The helper folder contains the custom stuff for the Vuetify plugin

#### Custom Icons - `customIcons.ts`

1. Create the Icon component that will be used to render the icons. I just extended the Icon component from the `nuxt-icon` package.

```vue
<template>
	<div>
		<Icon v-bind="$attrs" />
	</div>
</template>
<script setup></script>
```

2. Create the `aliases` object. Ensure that you pass in all the icons that are used by the Vuetify system.

3. Create the `custom` object.

```ts
const custom: IconSet = {
	component: (props: IconProps) =>
		// Return render function
		h(MIcon, {
			name: props.icon /** The Icon component requires the name prop in order to render the correct icon */,
			tag: props.tag,
			disabled: props.disabled,
		}),
};
```

Here is a link to the docs for this [Creating a custom iconset](https://next.vuetifyjs.com/en/features/icon-fonts/#creating-a-custom-icon-set)

#### Global Defaults - `defaults.ts`

This file here just set global props on different vuetify components. You can learn more here [Global Configuration](https://next.vuetifyjs.com/en/features/global-configuration/)

#### Themes - `themes.ts`

This file will hold all the different themes that you want to use in your app. Feel free to add more crazy schemes lol. Learn more here: [Vuetify Themes](https://next.vuetifyjs.com/en/features/theme/)

#### Form Rules - Composable

I added one composable for form rules. Add more here. You can even try integrating other validation packages like `yup` or `zod`

#### Icons

The public folder contains a `favicon` & `icon`. Change these out for your app and be sure to tweak the pwa config inside the `nuxt.config` file to fit your app