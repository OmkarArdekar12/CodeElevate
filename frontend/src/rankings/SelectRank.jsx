import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaMedal } from "react-icons/fa";

const SelectRank = ({ value, onChange, optionsMap }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const btnRef = useRef(null);
  const listRef = useRef(null);

  const entries = Object.entries(optionsMap);
  const selected = entries.find(([k]) => k === value) ?? entries[0];

  useEffect(() => {
    const i = Math.max(
      0,
      entries.findIndex(([k]) => k === value)
    );
    setActiveIndex(i);
  }, [value]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!btnRef.current || !listRef.current) return;
      if (
        !btnRef.current.contains(e.target) &&
        !listRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const openList = () => setOpen(true);
  const closeList = () => setOpen(false);

  const handleKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(entries.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        const [k] = entries[activeIndex];
        onChange({ target: { value: k } });
        closeList();
      }
    } else if (e.key === "Escape") {
      closeList();
    }
  };

  const variants = {
    hidden: { opacity: 0, y: -6, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.18, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -6,
      scale: 0.98,
      transition: { duration: 0.12, ease: "easeIn" },
    },
  };

  return (
    <div className="relative inline-block text-left md:text-lg text-md">
      <button
        type="button"
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKey}
        className="group flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white px-2 sm:px-5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600/70 shadow-sm hover:shadow-blue-600/20 cursor-pointer transition-all"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2">
          <FaMedal className="text-yellow-400" />
          <span className="font-medium">{selected?.[1]?.name ?? "Select"}</span>
        </span>
        <MdOutlineKeyboardArrowDown
          className={`text-xl transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="options"
            ref={listRef}
            role="listbox"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl border border-slate-700/70 bg-slate-900/90 backdrop-blur-xl shadow-xl ring-1 ring-black/5 overflow-hidden"
          >
            {entries.map(([k, v], i) => {
              const active = i === activeIndex;
              const selectedKey = k === value;
              return (
                <li
                  key={k}
                  role="option"
                  aria-selected={selectedKey}
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    onChange({ target: { value: k } });
                    closeList();
                  }}
                  className={[
                    "cursor-pointer px-4 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-blue-600/20 text-white"
                      : "text-slate-300 hover:bg-slate-800/60",
                    selectedKey ? "font-semibold text-blue-300" : "font-normal",
                  ].join(" ")}
                >
                  {v.name}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectRank;
