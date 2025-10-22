import FilterSection from "./FilterSection.jsx";
import Search from "./Search.jsx";
import { useState, useEffect } from "react";

export default function SearchSection({ userProfiles, setFilteredProfiles }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    let profiles = [...userProfiles];

    //search by fullName, username, role, domain, or tags
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      profiles = profiles.filter(
        (p) =>
          (p.fullName?.toLowerCase().includes(term) ?? false) ||
          (p.user?.username?.toLowerCase().includes(term) ?? false) ||
          (p.role?.toLowerCase().includes(term) ?? false) ||
          (p.domain?.toLowerCase().includes(term) ?? false) ||
          (Array.isArray(p.tags) &&
            p.tags.length > 0 &&
            p.tags.some((tag) => tag.toLowerCase().includes(term)))
      );
    }

    if (selectedFilter !== "") {
      switch (selectedFilter) {
        case "Trending":
          profiles = profiles.sort(
            (a, b) => (b.followers?.length || 0) - (a.followers?.length || 0)
          );
          break;

        case "CP/DSA":
          const cpKeywords = [
            "leetcode",
            "codeforces",
            "codechef",
            "atcoder",
            "dsa",
            "gfg",
            "hackerrank",
            "competitiveprogramming",
          ];
          profiles = profiles.filter(
            (p) =>
              (p.competitiveProfiles &&
                Object.values(p.competitiveProfiles).some(Boolean)) ||
              (Array.isArray(p.tags) &&
                p.tags.length > 0 &&
                p.tags.some((tag) =>
                  cpKeywords.some((word) => tag.toLowerCase().includes(word))
                ))
          );
          break;

        case "DEVS":
          const devKeywords = [
            "github",
            "portfolio",
            "javascript",
            "react",
            "node",
            "frontend",
            "backend",
            "gitlab",
            "springboot",
            "java",
            "android",
            "appdevelopment",
            "developer",
          ];
          profiles = profiles.filter(
            (p) =>
              (p.developmentProfiles &&
                Object.values(p.developmentProfiles).some(Boolean)) ||
              (Array.isArray(p.tags) &&
                p.tags.length > 0 &&
                p.tags.some((tag) =>
                  devKeywords.some((word) => tag.toLowerCase().includes(word))
                ))
          );
          break;

        case "Experienced":
          const expKeywords = [
            "senior",
            "lead",
            "manager",
            "expert",
            "sde",
            "engineer",
          ];
          profiles = profiles.filter(
            (p) =>
              p.showStats ||
              p.role ||
              p.domain ||
              (Array.isArray(p.tags) &&
                p.tags.length > 0 &&
                p.tags.some((tag) =>
                  expKeywords.some((word) => tag.toLowerCase().includes(word))
                ))
          );
          break;

        case "Professionals":
          const profKeywords = [
            "professional",
            "sde",
            "software",
            "engineer",
            "work",
            "working",
            "company",
          ];
          profiles = profiles.filter(
            (p) =>
              (p.role?.toLowerCase().includes("professional") ?? false) ||
              profKeywords.some(
                (word) => p.role?.toLowerCase().includes(word) ?? false
              ) ||
              (Array.isArray(p.tags) &&
                p.tags.length > 0 &&
                p.tags.some((tag) =>
                  profKeywords.some((word) => tag.toLowerCase().includes(word))
                ))
          );
          break;

        default:
          break;
      }
    }

    if (searchTerm.trim() !== "" || selectedFilter !== "") {
      setFilteredProfiles(profiles);
    } else {
      setFilteredProfiles(null);
    }
  }, [searchTerm, selectedFilter, userProfiles]);

  return (
    <div className="SearchSection w-[95%] flex flex-col gap-1 md:flex-row justify-center items-center transition-all duration-300 ease-in-out">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterSection
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
}
