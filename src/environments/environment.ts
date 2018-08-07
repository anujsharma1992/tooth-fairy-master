// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
	  apiKey: 'AIzaSyB7T9o7_nLcZw3VaydBEDDvi1Ou1WrRFXc',
	  authDomain: 'testquureo.firebaseapp.com',
	  databaseURL: 'https://testquureo.firebaseio.com',
	  projectId: 'testquureo', 
	  storageBucket: 'testquureo.appspot.com',
	  messagingSenderId: '141112767073'
	}
};