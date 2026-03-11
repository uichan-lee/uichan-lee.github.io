
## Important Terminology

- **Data**: The starting point for any visualization. By convention, data should be in a table object (e.g., `data.frame`, `tibble`) with variables stored as columns.

- **Geoms** (geometric objects): The visual marks drawn to represent data — such as points, lines, bars, polygons, etc.

- **Aesthetics**: The visual properties of geoms, such as x/y position, color, fill, shape, size, and transparency. Formally called *aesthetic attributes*.

- **Mapping**: Using a *variable* from the data to control an aesthetic (e.g., `aes(color = sex)` — color varies by the `sex` column).

- **Setting**: Using a *constant* value to control an aesthetic (e.g., `color = "blue"` — all points are blue, regardless of data).

- **Scales**: Control how data values are translated into aesthetic values (e.g., which colors represent which categories, or how numeric ranges map to axis positions).

- **Guides**: Auxiliary elements (tick marks, axis labels, legends) that help the viewer decode the visual mapping back to the data space.

# `ggplot2`
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


## Saving Plots

Use `ggsave()` to save the most recent plot to a file. The file format is inferred from the extension (e.g., `.png`, `.pdf`, `.svg`):
```r
ggsave("scatterplot.png")
```
