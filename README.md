# Sponsorship Prospectus
the Sponsorship website https://tbd.com/


# What's in this repo?
This repo hosts the GitHub Sponsorship website.

* https://tbd.com/


Table of Contents |
------------ |
[Running Locally](https://github.com/github/sponsorship-prospectus#running-locally) |
[Edit an event](https://github.com/github/sponsorship-prospectus#edit-an-event) |
[Edit a marketing page](https://github.com/github/sponsorship-prospectus#edit-a-marketing-page) |
[Add/edit FAQs](https://github.com/github/sponsorship-prospectus#add-an-faq) |

---

## Running locally

1. Clone this repo locally
2. `npm install` (if updating css/js)
3. `gulp` (if updating css/js)
4. Open a new terminal window and run `jekyll serve` or `bundle exec jekyll serve`
4. Open 'http://localhost:4000' in your browser


---

## Edit an event

### For each event
1. Open the event's .yml file in [this directory](https://github.com/github/sponsorship-prospectus/tree/master/_data).
2. This file will contain everything for the event except for the url and the order of the event.
3. To add images, navigate to [this directory](https://github.com/github/sponsorship-prospectus/tree/master/assets/images/events) then place the images in their respective event folder.
4. When adding photos in the .yml file, the image path should NOT include `assets/images/`. For example, if adding an image to Universe, the path would be `events/universe/image-file-name.png`.
5. To change the url or event order, open the city's file in the [_events directory](https://github.com/github/sponsorship-prospectus/tree/master/_events). The date field here is strictly for ordering purposes. The older the date, the earlier the event will display on the events landing page. (2018-1-1 will display before 2018-1-5).
6. If you would like someone to review your changes, commit them as a pull request and cc @andrewrmn or @sophshep. We will then approve and merge them.


---

## Edit a marketing page

### For each event
1. Open the pages's .yml file in [this directory](https://github.com/github/sponsorship-prospectus/tree/master/_data).
2. This file will contain everything for the page except for the url.
3. To add images, navigate to [this directory](https://github.com/github/sponsorship-prospectus/tree/master/assets/images/marketing) then place the images either in this folder or in their respective page folder.
4. When adding photos in the .yml file, the image path should NOT include `assets/images/`. For example, if adding an image to the Why Sponsor page, the path would be `marketing/why-sponsor/image-file-name.png`.
5. If you would like someone to review your changes, commit them as a pull request and cc @andrewrmn or @sophshep. We will then approve and merge them.


---

## Add an FAQ

1. Open [this file](https://github.com/github/sponsorship-prospectus/blob/master/_data/faqs.yml).
2. To create a new group, copy the entire block of another group and paste below. Remember, the spacing needs to be exact or the compile will fail.
3. To add a new question, add the `question:` and `answer:` fields in the desired group.
4. If you would like someone to review your changes, commit them as a pull request and cc @andrewrmn or @sophshep. We will then approve and merge them.
