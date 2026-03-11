---
title: "STAT 33B - Week 8: Graphics with ggplot2"
date: Mar 9
course: STAT 33B
---

# Graphics with ggplot2

## Important Terminology

The starting point is the **Data** that we want to visualize. The convention is to have data in a table object (e.g. `data.frame`, `tibble`) in which variables are stored as columns.

Then we have so-called **Geoms**, short for geometric objects; these are basically things such as bars, lines, points, polygons, and other kind of marks that are drawn to represent the data.

Geoms have **visual properties**, formally known as aesthetic attributes, and colloquially referred to as *aesthetics*; these are things such as x and y positions, line color, fill color, point shapes, etc.

The use of a variable (from the data) to encode a visual property of a geom is called a **mapping**.

The use of a constant (or a value outside the data) to encode a visual property of a geom is called a **setting**.

**Scales** are used to handle the mapping from the values in the data space to values in the aesthetic space.

**Guides** are those auxiliary elements that allow the viewer to decode the mapping of the visual properties back to the data space. Perhaps the most typical guides are the tick marks, the labels on an axis, and legends (when applicable).

# ggplot2 Basics

## Basic Structure

```r
sw_dat = data.frame(
	name = c('Leia', 'Luke', 'Han'),
	sex = c('female', 'male', 'male'),
	force = c(TRUE, TRUE, FALSE),
	height = c(150, 172, 180),
	weight = c(49, 77, 80)
)

ggplot(data = sw_dat,
    mapping = aes(x = height,
                  y = weight,
                  color = sex,
                  label = name)) +
    geom_point() +
    geom_text()
```

## Examples

```r
ggplot(data = sw_dat,
    mapping = aes(x = height,
				  y = weight,
				  color = sex,
				  label = name)) +
	geom_point() +
	geom_text(hjust = -0.2) +
	scale_x_continuous(limits = c(150, 190)) +
	labs(title = "Relationship between height and weight",
	     x = "height (cm)",
	     y = "weight (kg)") +
	 theme_minimal()
```

## Saving

Use `ggsave()` to save the most recent plot you created:

```r
ggsave("scatterplot.png")
```
