# Architecture

This document describes the initial specification for the new web-project.

## Introduction and Goals

The project is called "Bring Back Our Neighbors". We had protested "back then" against the illegal deportation of the 9-member family I. from Pirna (June-August 2021). And finally, after a successful campaign, the family was brought back... and we had won the "Saxon Promotion Prize for Democracy 2021" and also received some donations.

We used the money to develop extensive multilingual information for refugees. The aim is to prevent deportations by providing clear and understandable information.

So far, we have produced 9 flyers (1 more in progress) in 6 languages (German, English, French, Georgian, Arabic, Urdu + further translations planned/in progress) and 3 emergency kits against deportations. Flyers are short texts and an emergency kit is a collection of various longer texts and lists with advice centers and addresses as well as templates for letters to authorities. Within the material there are many cross-references and links - also via QR codes.

Until now, all the materials were first created individually (in Office) and then translated and then created into PDFs with Canva/InDesign/Office and then placed on the website. For the cross-references, there is also a shortlink, e.g. https://bbonlink.de/flyer-de-dublin . With the shortlinks we also refer to material from others, sometimes differently for each language. And as you can see now: (9 flyers + 3 suitcases) * 6 languages + the links = well over 100 places where information is available that now needs to be updated for the first time.... and that is just too much for us.

I think it would make sense instead to compile the content of the flyers and emergency kits from dynamic blocks with their references and then generate the PDFs fully automatically from ready-made templates so that each piece of information only has to be maintained once and is then immediately available live.

The design should also be simple, clear and above all mobile-friendly and work well with all languages.

### Requirements Overview

We have to focus mainly on 4 groups of people, who's needs will influence the way we set up this project:
- Affected: People using the content and who are themselves in danger of a deportation and want to inform themselves
- Editors: Volunteers, who create and update and translate the content
- Programmers: Volunteers who design and implement the software/systems that will provide the content
- Supporters: People who do counselling or political organising and try to inform Affected
People with the help of the content.

The order of this list also reflects a certain priority in whos needs we should not be compromising. The Editors and Programmers are part of the project team.

- Accessibility:
  - Mobile first
  - works well without good network/wifi
  - content can be saved/work offline
- Internationalisation
  - works in every language we can provide
  - simple interface and navigation
  - it's possible to refer to not yet translated content
  - the content and the interface needs to be available in
- Availability
  - the content can be found easily via search engines
  - older – outdated links and their qrs can still be followed and will lead to the newest version
  - content can be easily shared with others
- Timeliness and Maintainability
  - it's clear when some content was created/updated
  - new content can be made available easily, per language within days
  - certain data might change more often – addresses for example need to updated more often
  - No duplicated content needs to be managed
  - only editors and programmers need to be able to make changes
  - editors and especially translators need to be able to work on the content easily
  - for the programmers it needs to be at least not painful to implement

### Architecture Constraints

We need to comply with laws - mainly in regard to privacy.

The whole thing shouldn't cost anything. We are able to spend a few euros a month on hosting and can also raise funds for small translations. But that's it.
