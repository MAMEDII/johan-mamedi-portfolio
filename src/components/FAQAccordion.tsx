import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FAQItem, Language } from "../types/content";
import { localized } from "../utils/content";

interface FAQAccordionProps {
  items: FAQItem[];
  language: Language;
}

export function FAQAccordion({ items, language }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        return (
          <article className={`faq-item ${open ? "is-open" : ""}`} key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{localized(item.question, language)}</strong>
              <Plus className="faq-plus" />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  className="faq-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{localized(item.answer, language)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
