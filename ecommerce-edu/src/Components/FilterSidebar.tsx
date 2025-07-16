import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Done from "@mui/icons-material/Done";
// import { useState } from "react";
import "../Style/FilterSideBar.css";
import { Filters } from "../Model/Product";

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (key: string, value: Filters[keyof Filters]) => void;
}

const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  console.log("Current filters:", filters);

  const topics = ["Khóa học", "Sách", "TOEIC", "IELTS"];

  const toggleCategory = (cat: string) => {
    const newCats = filters.categories.includes(cat)
      ? filters.categories.filter((c: string) => c !== cat)
      : [...filters.categories, cat];

    onFilterChange("categories", newCats);
  };

  const togglePrice = (range: string) => {
    const newRanges = filters.priceRanges.includes(range)
      ? filters.priceRanges.filter((r: string) => r !== range)
      : [...filters.priceRanges, range];

    onFilterChange("priceRanges", newRanges);
  };

  return (
    <Box className="container">
      <Typography variant="h6" gutterBottom>
        Bộ lọc
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Khoảng giá */}
      <Typography variant="subtitle1">Khoảng giá</Typography>

      <FormControlLabel
        control={
          <MuiCheckbox
            checked={filters.priceRanges.includes("0-500")}
            onChange={() => togglePrice("0-500")}
          />
        }
        label="< 500K"
      />
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={filters.priceRanges.includes("500-1000")}
            onChange={() => togglePrice("500-1000")}
          />
        }
        label="500K – 1 triệu"
      />
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={filters.priceRanges.includes("1000+")}
            onChange={() => togglePrice("1000+")}
          />
        }
        label="> 1 triệu"
      />
      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Loại
      </Typography>
      <List
        orientation="horizontal"
        wrap
        sx={{
          "--List-gap": "8px",
          "--ListItem-radius": "20px",
          "--ListItem-minHeight": "32px",
          "--ListItem-gap": "4px",
        }}
      >
        {topics.map((topic) => (
          <ListItem key={topic}>
            {filters.categories.includes(topic) && (
              <Done
                color="primary"
                sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
              />
            )}
            <Checkbox
              size="sm"
              disableIcon
              overlay
              label={topic}
              checked={filters.categories.includes(topic)}
              variant={filters.categories.includes(topic) ? "soft" : "outlined"}
              onChange={() => toggleCategory(topic)}
              slotProps={{
                action: ({ checked }) => ({
                  sx: checked
                    ? {
                        border: "1px solid",
                        borderColor: "primary.500",
                      }
                    : {},
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FilterSidebar;
