# ExportSMS
React-native app (Android and iOS) to view SMS stored on the phone, and easily export them to standard data exchange formats (JSON and XML).


## Why this app?
A few weeks ago, I searched for a way to create a backup for my SMS. And I have found nothing worth of interest. I couldn't to it natively with my Android phone. My mobile services provider was charging a fee for it. And some apps on the store let you do it for free, but I have no idea what they are doing once I give them access to my contacts, SMS, storage, etc...
I just want do make a backup of my SMS, for free, without giving away my privacy. We're in 2021 godammn it: it should be made easy by now! So here we go, I put my react-native's knowledge to good use, to create this free, ad-free, privacy respecting, open-source mobile app.
The aim is to make an app easy to use, and going straight to the point.

## Screenshots (v1.0.0 - Current)
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/44072355/140552643-13c1706a-4ca3-4d55-9ffa-b9c49c6d8236.png" alt="Choose an export format" width="200"/>
  <img src="https://user-images.githubusercontent.com/44072355/140552676-55bcd626-c95e-454b-9c87-345ee9bf1e28.png" alt="See stats and write file" width="200"/>
  <img src="https://user-images.githubusercontent.com/44072355/140552694-41301560-376d-420c-a5f6-90d16b3d8d71.png" alt="File written confirmation" width="200"/>
</div>

## How to use?
1. Harder but safer

The only way to use this app today is to clone this repository on your computer, install react-native dev tools, plug your phone to the computer, and run the app on your phone. This is the safest way if you don't believe in anyone, as you can check the code before running it on your phone. (Refer to Clone&Run below)

2. Easier but not that safe

Tomorrow (understand: in the near future), I will upload both an .apk (Android) and an .ipa (iOS) files to this repository, so you will be enable to simply download this single fiole to install the app on your phone. Be aware that by doing it this way, you can't check the content of the code you're installing. I have absolutely no intentions nor interests to stole your private data. But you know, for you I am just a stranger on the internet. I say it is safe, so it is up to you to believe me or not.

3. Easy and safe(?)

I own a company selling another app on both stores (Hello 'Kinker - Match your kinks'). So, when the app's quality will be high enough, I will release it as a downloadable app on both the Play Store and the Apple Store.

## Clone&Run
Here are the instructions for you to clone this repository, and start using the app, or even modifying it:
- `git clone https://github.com/HugoDuret/ExportSMS`
- Install the react-native tools on your computer: https://reactnative.dev/docs/environment-setup
- Allow the developper mode on your phone (A little internet research is necessary, as it depends on the phone you have)
- Plug your phone to the computer
- From inside the ExportSMS directory, run `yarn start`

If that doesn't work, please follow the instructions below in this specific order:
1. Yell at your computer
2. ~~Google~~ Qwant your problem
3. Fill in an issue on GitHub  
