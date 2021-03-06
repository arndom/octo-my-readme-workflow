## Preview

<img src="https://media.giphy.com/media/JrpfevOVogixZYWp9O/source.gif" width="400px" alt="preview"/>


## How to use

1. Star this repo 😉
2. Go to your special repository(repo with name the same as git username).
3. Create a folder named `.github` and create a `workflows` folder inside it, if it doesn't exist.
4. Create a new file named `octo-lang.yml` with the following contents inside the workflow folder:

```yaml
name: Octo my README 

on:
  # schedule: # Run workflow automatically
  #   - cron: '0 * * * *' # Runs every hour, on the hour
  workflow_dispatch: # Run workflow manually (without waiting for the cron to be called), through the Github Actions Workflow page directly

jobs:
  get_lang_gen_octo:
    runs-on: ubuntu-latest
    name: Get Language & Generate Ocoto-lang
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Get most used language then generate ocoto lang
      id: octo-lang
      uses: arndom/octo-my-readme-workflow@v1
```

5. Commit and trigger it manually, after the run, a  `my-ocoto-lang.png` file will be created in your repository.
6. You can display it in your `README.md` like this:

```markdown
<p> Here is arndom's ocoto-lang:</p>
<img src= "./my-octo-lang.png" width="400px"/>
```

### The result

<p> Here is arndom's ocoto-lang:</p>
<img src= "./my-octo-lang.png" width="400px"/>


## Supported Languages

Currently this supports the following languages:

- C
- C++
- C#
- CSS
- GO
- Haskell
- HTML
- Java
- JavaScript
- Kotlin
- Lua
- php
- Python
- R
- Ruby
- Swift
- Typescript    
  More coming soon...

## Special thanks to

- All users of the workflow
- Dev.to for the github actions hackathon that inspired me to build this
- [@gautamkrishnar](https://github.com/gautamkrishnar) & [@theboi](https://github.com/theboi) for writing awesome action code that helped me find my way around.
- [@Rahnard](https://github.com/Rahnard) for the styling of the octocat
- [@abranhe](https://www.npmjs.com/package/programming-languages-logos) for the programming logos package

## Liked it?
Hope you like this, Don't forget to give this a star ⭐
