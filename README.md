# Lunch line monitor

A screen beside the food truck that shows the wait and what's sold out.

## The problem

At lunch, people get in line without knowing how long it is or what's left. Some give up halfway. Others wait 15 minutes and find out at the window that what they wanted is sold out. By the window it's too late; that's the moment we want to move earlier.

## Our plan

**1. What information goes in?**
- Today's menu and which items are sold out. This already lives in our company data (`menu.json`, week 7).
- How many orders are waiting. The cashier updates it in `data/line.json`.

**2. What do we do with it?**
- Estimate the wait: orders waiting x 2 minutes per order.
- Split the menu into "available" and "sold out".

**3. How should it look?**
- Like a menu board, or the wait-time signs at a theme park: one big number for the wait, then two lists.
- Readable from across the parking lot, and on a phone.

## Done looks like

1. A sold-out item shows up only under "Sold out today".
2. The wait changes when the line changes.
3. It's readable at phone width.
