import { Box, Chip, IconButton, InputBase, Paper } from "@mui/material";
import "../Style/HeroBanner.css";
import SearchIcon from "@mui/icons-material/Search";
import { Filters } from "../Model/Product";
import { useState } from "react";

interface HeroBannerProps {
  filters: Filters;
  onFilterChange: (key: string, value: Filters[keyof Filters]) => void;
}

const suggestions = [
  "Sách TOEIC",
  "Sách IELTS",
  "Khóa học tiếng Anh mất gốc",
  "Tiếng Anh giao tiếp",
  "Khóa luyện nghe",
  "Từ vựng học thuật",
];


const HeroBanner = ({ filters, onFilterChange }: HeroBannerProps) => {
  const [input, setInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">Tìm sách hoặc khóa học</h1>
        <Paper
          component="form"
          className="search-bar"
          elevation={3}
          onSubmit={handleSearch}
        >
          <InputBase
            className="search-input"
            placeholder="Bạn muốn học gì?"
            inputProps={{ "aria-label": "search courses or books" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            type="submit"
            className="search-icon"
            aria-label="search"
            onClick={() => {
              const trimmed = input.trim();
              if (trimmed) {
                const updatedKeyword = filters.keyword.filter((k) =>
                  k !== trimmed
                );
                onFilterChange("keyword", [...updatedKeyword, trimmed]);
              }
              setInput("");
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box className="suggestion-box">
          {suggestions.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              variant="outlined"
              className="suggestion-chip"
              onClick={() => {
                const current = filters.suggestedKeyword || [];
                if (!current.includes(keyword)) {
                  onFilterChange("suggestedKeyword", [...current, keyword]);
                }
              }}
            />
          ))}
        </Box>
      </div>
    </div>
  );
};

export default HeroBanner;
