import { useEffect, useMemo, useRef, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { themeColors } from "../../styles/themeColors";
import { glossaryEntries } from "../../data/glossary";
import "./index.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const Glossaire = () => {
  const [query, setQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);

  const lettersWithContent = useMemo(() => {
    const set = new Set(glossaryEntries.map((e) => e.letter?.toUpperCase()));
    return set;
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return glossaryEntries
      .filter((e) => {
        if (selectedLetter && e.letter?.toUpperCase() !== selectedLetter)
          return false;
        if (!q) return true;
        const inTerm = normalize(e.term).includes(q);
        const inDef = normalize(e.definition).includes(q);
        const inTags = (e.tags || []).some((t) => normalize(t).includes(q));
        return inTerm || inDef || inTags;
      })
      .sort((a, b) => a.term.localeCompare(b.term, "fr"));
  }, [query, selectedLetter]);

  const PAGE_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, selectedLetter]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((curr) => {
            if (curr >= filtered.length) return curr;
            return Math.min(curr + PAGE_SIZE, filtered.length);
          });
        }
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length]);

  const displayed = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  return (
    <MainLayout className="glossaireLayout">
      <div className="glossaire">
        <div className="glossaire-header">
          <h1>Glossaire du numérique</h1>
          <p>
            Comprendre les mots du numérique et ses enjeux, avec un ton clair et
            bienveillant. Cherche un terme, parcours l’alphabet et découvre des
            définitions utiles pour t’informer et en parler en famille.
          </p>
          <div className="glossaire-search">
            <input
              aria-label="Rechercher dans le glossaire"
              type="text"
              placeholder="Rechercher un terme, un concept, un tag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ backgroundColor: themeColors.violet.light }}
            />
          </div>
          <div className="glossaire-alpha">
            <button
              type="button"
              className={`alpha-item ${
                selectedLetter === null ? "active" : ""
              }`}
              onClick={() => setSelectedLetter(null)}
              aria-pressed={selectedLetter === null}
              aria-label="Afficher tous les termes"
              title="Tous"
              style={
                selectedLetter === null
                  ? { backgroundColor: themeColors.orange.main }
                  : undefined
              }
            >
              Tous
            </button>
            {ALPHABET.map((letter) => {
              const has = lettersWithContent.has(letter);
              const active = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  className={`alpha-item ${active ? "active" : ""}`}
                  disabled={!has}
                  onClick={() =>
                    setSelectedLetter((curr) =>
                      curr === letter ? null : letter
                    )
                  }
                  style={
                    active
                      ? { backgroundColor: themeColors.orange.main }
                      : undefined
                  }
                  aria-pressed={active}
                  aria-label={
                    has
                      ? `Filtrer par la lettre ${letter}`
                      : `Aucun terme pour ${letter}`
                  }
                  title={
                    has ? `Filtrer par ${letter}` : `Aucun terme pour ${letter}`
                  }
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glossaire-results">
          {filtered.length === 0 ? (
            <div className="glossaire-empty">
              Aucun résultat. Essaie une autre lettre ou un autre mot-clé.
            </div>
          ) : (
            <ul className="glossaire-list">
              {displayed.map((item) => (
                <li
                  key={`${item.letter}-${item.term}`}
                  className="glossaire-item"
                >
                  <div className="glossaire-term">
                    <span
                      className="glossaire-badge"
                      style={{ backgroundColor: themeColors.teal.main }}
                    >
                      {item.letter}
                    </span>
                    <h3>{item.term}</h3>
                  </div>
                  <p className="glossaire-definition">{item.definition}</p>
                  {!!item.tags?.length && (
                    <div className="glossaire-tags">
                      {item.tags.map((tag) => (
                        <span
                          key={`${item.term}-${tag}`}
                          className="glossaire-tag"
                          style={{ backgroundColor: themeColors.violet.light }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {displayed.length < filtered.length && (
          <div ref={sentinelRef} className="glossaire-sentinel" aria-hidden />
        )}
      </div>
    </MainLayout>
  );
};

export default Glossaire;
