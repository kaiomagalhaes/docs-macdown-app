# :key: Authentication

All Azure Artifacts feeds require authentication, so you'll need to store credentials for the feed
before you can install or publish packages. NPM uses `.npmrc` configuration files to store feed URLs 
and credentials.

We will use two `.npmrc` files:

* One `.npmrc` should live at the root of òur project adjacent to our project's `package.json`. 
It should contain a "registry" line for your feed and it should not contain credentials since it 
will be checked into git.

* On your development machine, you will also have a `.npmrc` in `$HOME` for Linux or Mac systems 
or `$env.HOME` for win systems. This `.npmrc` should contain credentials for all of the registries 
that you need to connect to. The NPM client will look at your project's `.npmrc`, discover the registry, 
and fetch matching credentials from `$HOME/.npmrc` or `$env.HOME/.npmrc`. 

## Set up authentication

First, get the Azure credentials on the 1password vault. If you don't have access to it talk to the responsible 
for this project or a manager.  

### On your local computer
1. Create the npmrc file: `touch $HOME/.npmrc`.   
2. Paste the credentials in the `$HOME/.npmrc` file.  
3. Now you'll be able to run `npm install`.

### With docker
You just need to update the Azure ENV variables in your `.env` file. 
