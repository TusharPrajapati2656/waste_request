// src/pages/home/hooks/useFaq.js

import { useState } from "react";
import { faqData } from "../data/homeData";

export function useFaq() {
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [openFaqIds, setOpenFaqIds] = useState([]);

  const [isFaqExpanded, setIsFaqExpanded] = useState(false);

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFaqExpand = () => {
    setIsFaqExpanded((prev) => !prev);
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeFaqCategory === "all" || item.category === activeFaqCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return {
    activeFaqCategory,
    setActiveFaqCategory,
    faqSearchQuery,
    setFaqSearchQuery,
    openFaqIds,
    toggleFaq,
    isFaqExpanded,
    setIsFaqExpanded,
    toggleFaqExpand,
    filteredFaqs,
  };
}
