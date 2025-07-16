import { Box, Chip, Button } from "@mui/material";
import { Filters, FilterChip } from "../Model/Product";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

// Chuyển filter thành danh sách chip để hiển thị
const getActiveChips = (filters: Filters): FilterChip[] => {
  console.log("🚀 ~ filters:", filters)
  return [
    ...(filters.keyword.length > 0
      ? filters.keyword.map((key) => ({
          type: "keyword",
          label: key,
          value: key,
        }))
      : []),

    ...(filters.suggestedKeyword.length > 0
      ? filters.suggestedKeyword.map((sug) => ({
          type: "suggested",
          label: sug,
          value: sug,
        }))
      : []),

    ...filters.priceRanges.map((range) => ({
      type: "price",
      label: `${range}K`,
      value: range,
    })),

    ...filters.categories.map((cat) => ({
      type: "category",
      label: cat,
      value: cat,
    })),
  ];
};

const FilterChipsBar = ({ filters, setFilters }: Props) => {
  const chips = getActiveChips(filters);

  const handleRemoveFilter = (chip: FilterChip) => {
    switch (chip.type) {
      case "keyword":
        setFilters((prev: Filters) => ({
          ...prev,
          keyword: prev.keyword.filter((c) => c !== chip.value),
        }));
        break;

      case "suggested":
        setFilters((prev: Filters) => ({
          ...prev,
          suggestedKeyword: prev.suggestedKeyword.filter(
            (c) => c !== chip.value
          ),
        }));
        break;
      case "price":
        setFilters((prev: Filters) => ({
          ...prev,
          priceRanges: prev.priceRanges.filter((r) => r !== chip.value),
        }));
        break;
      case "category":
        setFilters((prev: Filters) => ({
          ...prev,
          categories: prev.categories.filter((c) => c !== chip.value),
        }));
        break;
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      keyword: [],
      suggestedKeyword: [],
      priceRanges: [],
      categories: [],
    });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, mx: 3 }}>
      {chips.map((chip, idx) => (
        <Chip
          key={idx}
          label={chip.label}
          onDelete={() => handleRemoveFilter(chip)}
        />
      ))}

      {chips.length > 0 && (
        <Button onClick={handleClearAllFilters} sx={{ textTransform: "none" }}>
          Clear All
        </Button>
      )}
    </Box>
  );
};

export default FilterChipsBar;
