"""
build_kb.py
-----------
Génère une base de connaissances (kb.json) à partir des fichiers Markdown
du dossier `docs/` de ton site mkdocs (Wiki Formation IA générative).

Ce fichier kb.json sera utilisé par le Worker Cloudflare pour ne répondre
qu'à partir du contenu réel du site (retrieval + grounding).

Usage :
    python build_kb.py
(à lancer depuis la racine de ton repo, là où se trouve mkdocs.yml)

Sortie :
    rag/kb.json
"""

import json
import re
import unicodedata
from pathlib import Path

# --- Configuration --------------------------------------------------------

DOCS_DIR = Path("docs")
SITE_URL = "https://pierre-l-hue.github.io/wiki-formation-ia/"
OUTPUT = Path("rag/kb.json")
CHUNK_SIZE = 800  # caractères max par morceau de section

# ---------------------------------------------------------------------------


def normalize(text: str) -> str:
    """Supprime les accents pour faciliter la recherche par mots-clés."""
    text = unicodedata.normalize("NFKD", text)
    return "".join(c for c in text if not unicodedata.combining(c))


def md_to_url(md_path: Path) -> str:
    """Reconstruit approximativement l'URL mkdocs à partir du chemin du fichier."""
    rel = md_path.relative_to(DOCS_DIR).as_posix()
    if rel.endswith("index.md"):
        rel = rel[: -len("index.md")]
    else:
        rel = rel[: -len(".md")] + "/"
    return SITE_URL + rel


def split_sections(text: str):
    """Découpe un fichier Markdown en sections (titres # ou ##)."""
    lines = text.splitlines()
    sections = []
    current_title = None
    current_lines = []

    for line in lines:
        if re.match(r"^#{1,2}\s+", line):
            if current_lines:
                sections.append((current_title, "\n".join(current_lines).strip()))
            current_title = re.sub(r"^#{1,2}\s+", "", line).strip()
            current_lines = []
        else:
            current_lines.append(line)

    if current_lines:
        sections.append((current_title, "\n".join(current_lines).strip()))

    return [(t, c) for t, c in sections if c]


def main():
    if not DOCS_DIR.exists():
        raise SystemExit(
            f"Dossier '{DOCS_DIR}' introuvable. Lance ce script depuis la racine du repo."
        )

    chunks = []
    idx = 0

    for md_file in sorted(DOCS_DIR.rglob("*.md")):
        text = md_file.read_text(encoding="utf-8")
        url = md_to_url(md_file)

        title_match = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
        page_title = title_match.group(1).strip() if title_match else md_file.stem

        for section_title, content in split_sections(text):
            # On retire les gros blocs de code pour ne pas polluer le contexte
            content = re.sub(r"```.*?```", "", content, flags=re.DOTALL).strip()
            if len(content) < 30:
                continue

            for i in range(0, len(content), CHUNK_SIZE):
                piece = content[i : i + CHUNK_SIZE].strip()
                if len(piece) < 30:
                    continue
                idx += 1
                chunks.append(
                    {
                        "id": f"c{idx}",
                        "page_title": page_title,
                        "section_title": section_title or page_title,
                        "url": url,
                        "content": piece,
                        "content_norm": normalize(piece.lower()),
                    }
                )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(chunks, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"{len(chunks)} extraits écrits dans {OUTPUT}")


if __name__ == "__main__":
    main()
