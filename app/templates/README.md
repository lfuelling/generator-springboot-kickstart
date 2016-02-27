## Misc

- If you get HTML (the login page) as output in the terminals, your session is invalid and you need to log in again.
- Ace (the code editor) seems to be incompatible with DOM updates (like a change of the `height` attribute). They provide a method to be called for this: `editor.resize()`
    - [Supported languages for highlighting](https://github.com/ajaxorg/ace/tree/master/lib/ace/mode)
- There was an issue when saving that every keypress except backspace (which is put in ace) is put in the terminal. I had a conversation with the developer of JQuery.Terminal to resolve this issue. It's saved in [focusbug.txt](focusbug.txt).

## Running

1. Start MongoDB by running `mongod --config mongod.conf` in the project root
2. Start Codr using your IDE (or the CLI if you know how)

I recommend setting the following environment variables when developing:

![Envs](env.png)

When using those, you'll have a clean setup after every build.

## HTTPS

To get rid of the "invalid cert" alert, you need to build a new keystore containing a valid SSL certificate. Instructions for this can be found [in the oracle docs](https://docs.oracle.com/cd/E19509-01/820-3503/ggfhb/index.html) or [on palantir's site](https://www.palantir.com/2008/06/pkcs12/) (I haven't tested both but they seem valid) The Palantir how to also covers the generation of the key itself.

After that you need to update the SSL specific values in `./src/main/resources/application.properties` to match your setup.
