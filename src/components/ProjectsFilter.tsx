import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronDown } from "lucide-react";

interface ProjectsFilterProps {
  category?: string;
  location?: string;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

// Major towns and cities in Kenya
const KENYAN_LOCATIONS = [
  "All locations",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
  "Garissa",
  "Kakamega",
  "Nyeri",
  "Meru",
  "Machakos",
  "Naivasha",
  "Nanyuki",
  "Lamu",
  "Kericho",
  "Bungoma",
  "Migori",
];

const ProjectsFilter = ({
  category = "all",
  location = "All locations",
  onCategoryChange,
  onLocationChange,
  onSearchChange,
  onSortChange,
  totalCount,
}: ProjectsFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar and Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666] pointer-events-none" />
          <Input
            type="text"
            placeholder="Search project..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-10 border-[#E5E5E5] bg-white focus:border-[#1A1A1A] rounded-md"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full md:w-[180px] h-10 border-[#E5E5E5] bg-white rounded-md focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="All project types" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All project types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="mixed-use">Mixed-Use</SelectItem>
            </SelectContent>
          </Select>

          {/* Location Filter */}
          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger className="w-full md:w-[180px] h-10 border-[#E5E5E5] bg-white rounded-md focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="All locations" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              {KENYAN_LOCATIONS.map((loc) => (
                <SelectItem key={loc} value={loc === "All locations" ? "all" : loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Options */}
          <Select defaultValue="date-desc" onValueChange={onSortChange}>
            <SelectTrigger className="w-full md:w-[150px] h-10 border-[#E5E5E5] bg-white rounded-md focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Sort" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date ↓</SelectItem>
              <SelectItem value="date-asc">Date ↑</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project Count */}
      <div className="text-sm text-[#666666] font-medium">
        {totalCount} Project{totalCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default ProjectsFilter;
