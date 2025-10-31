## Will's Reflection

For this assignment, we decided to take on a thematically appropriate challenge of creating a website that users can go to and place a booking for a stay at a "Spooky Spot", whether that be an overnight stay in a haunted location, or a nights of paranormal ghost investigations. One of the core features that we talked about from the beginning was to have a map that the users could use to navigate around and find their spooky spot of choice. We wanted the user to be able to conveniently find Spooky Spots that were close to them. Once the user has found a place, they would be able to read about the place and see what it looks like, and select a date to book it. Also on the page of a specific place would be user comments that serve as a guestbook/review style addition to the page. Across the development of the website, we hit some challenges and overcame them!

## /:place Page

My biggest responsibility for this project was to create the `/:place` route page, which is the endpoint for any given spooky spot that exists. This page displays a lot of information as it serves as the page for a lot of functionality. The page starts with a picture of the place and a description of the service they offer. Underneath, we have a history of the place. Often times with spooky locations, it's always about the history that gets explorers and investigators interested in it, as they learn about the people that maybe lived there, down to the entities said to be attached to it.

Then there is a section for the booking form

## Booking Form

The booking form provided us with several problems that took a while to resolve. The functionality of the section presents the user with a form only if they're logged in, and has the user pick a date. Once a date has been picked, it presents the user with a form to fill out their details to confirm the booking.

**The Problem**
When a user placed a booking, there were no checks for availability with the Spooky Spot, and so the ability to flood a spooky spot with bookings that they cannot fulfill was very possible.

**The Solution**
To resolve this issue, we first needed to pull a list of bookings for any given date. when doing a `SELECT` query on our database, the response would have `rowCount` as a property, allowing us to `SELECT FROM bookings WHERE date = <some date>` and getting the `rowCount` as a number of bookings made for that date.

To make this more satisfying to use, when the user selects a date, we wanted to dynamically query the database. We implemented useState to keep track of the date selected from the input date picker. When the user selects a date from the date picker, the `onChange` callback sets our selected date as a `state` which can be used to "plug in" to our database query. Because we wanted our query to be dynamic, this meant that we needed to use the useEffect hook that we could put the date in as a dependancy, so that when the chosen date changed -> the state changed -> the database query would grab new data -> we would get the `rowCount` for the chosen date.

To ensure that there was enough availability, we finally did a comparison if the rowCount was less than the Spooky Spots `booking_slots` count set in the database. If the `rowCount` was less than the `booking_slots`, then there is availability for another booking.

Due to the nature of the booking form being a `client` component due to the usage of `React Hooks` such as `useState`, we had to make `API routes` instead of being able to query the database directly as you can with `server components`. These were done at the endpoint `/api/[route]/route.js`

## Comments form

Another section of the place page that I was responsible for was building the comments form, and listing all comments left for that place. This was pretty standard as far as our previous experience building CRUD applications in previous assignments and there isn't much to add that I haven't already in the past. One aspect of this comments form that is different from the rest I've done in the past, is I included a button to delete comments that only the user left. To achieve this, I conditionally rendered a `<form>` with a `<button>` linked to a submit handler to delete a comment, and checked if the `currentUser()` username was the same user that left the comment, with optional chaining as a catch incase the user was not logged in:

```javascript
user?.username === comment.username ? /* render form elements */ : null
```

## User validation

My contribution to other pages outside of the odd snippets of code here and there and some styling, was mostly in the form of setting validation to check the current user. Using the below code, we were able to check if there is a user logged in:

```javascript
const user = await currentUser();
if (!user) {
  redirect("/");
}
```

Adding this at the top of pages that required the user to be logged in, such as the `/user/profile` page would redirect the user away.

There were many instances where we wanted the user to only be able to access a page if they were a site admin. When the user creates an account, they're defaulted with a `user` role that has an ID of `1`, and in our database we can set a users role_id to `2` which indicates an "Admin". This allowed us to conditionally render a link in our navigation that takes you to a page where an Admin can create a new Spooky Spot. While on this page, the admin can also set the owner of the spot by their username. When a user who is the owner of a Spooky Spot accesses their own Spooky Spot page, they will see buttons to Manage and Edit their spot. This was achieved using the following:

```javascript
// user is currentUser()
// placeData is selecting all data for the current spooky spot, including the username of the owner.
// if the usernames don't match, they dont have access here and are redirected.
if (user.username !== placeData.owner_username) {
  redirect(`/${placeParam}`);
}
```

## Working as a team

I'm very happy with how we worked as a team overall. From the moment we started planning the week before any coding began, it felt as though we were all on the same page with the project with a clear vision. Throughout the entire development, we didn't have any personal conflicts between us which I believe is a testament to our initial thoughtful planning. Being on the same page allowed us to reflect upon any code we were doing and any conversations around coding were all within the same context of what we had planned. This didn't leave any room for the expected result to be vastly different from the original idea.

While not everything we had planned was implemented, such as the image gallery, we often set times where we would all push what we had, and have a mini standup meeting mid way through the day to check our progress. This allowed us to properly evaluate where we were at, whether what we wanted to do was achievable, and if not, how we could pivot to get the most out of the time we had.
